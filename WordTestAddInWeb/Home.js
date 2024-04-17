
'use strict';

Office.onReady(function () {
    // Office is ready.
    $(document).ready(function () {
        console.log("getClientInfo");
        // The document is ready.
        // Use this to check whether the API is supported in the Word client.
        if (Office.context.requirements.isSetSupported('WordApi', '1.1')) {
            // Do something that is only available via the new APIs.
            $('#client').on("click", getClientInfo);
            $('#documents').on("click", getDocumentsInfo);
            $('#files').on("click", getFilesInfo);
            $('#findandreplace').on("click", findAndReplace);
            $('#supportedVersion').html('This code is using Word 2016 or later.');
        } else {
            // Lets you know that this code will not work with your version of Word.
            $('#supportedVersion').html('This code requires Word 2016 or later.');
        }
    });
});

$(document).ready(function () {
    // Fetch data from the server-side endpoint
    $.ajax({
        url: 'https://localhost:7129/api/Client', 
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var $select = $('#mySelect');
            $select.empty();
            // Iterate over the data and append a new option to the select
            $.each(data, function (key, value) {
                $select.append($('<option></option>').val(value.firstName).html(value.lastName));
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
});




    async function getClientInfo() {
        try {
            const response = await fetch('https://localhost:7129/api/Client');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const clientData = await response.json();
            console.log('Client Information:', clientData);

            //  insert the client information into a table in the document
            Word.run(async (context) => {
                const tableData = [];

                clientData.forEach(client => {
                    tableData.push([client.id, client.firstName, client.lastName, client.adress, client.cnp]);
                });

                const table = context.document.body.insertTable(clientData.length, 5, "Start", tableData);
                // table.styleBuiltIn = Word.BuiltInStyleName.gridTable5Dark_Accent2;
                // Synchronize the document state by executing the queued commands
                await context.sync();
            });

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }





    async function getDocumentsInfo() {
        try {
            const response = await fetch('https://localhost:7129/api/Documents');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const documentData = await response.json();
            console.log('Documents:', documentData);

            //  insert the client information into a table in the document
            Word.run(async (context) => {
                const tableData = [];

                documentData.forEach(document => {
                    tableData.push([document.id, document.Name, document.Description]);
                });

                const table = context.document.body.insertTable(documentData.length, 3, "Start", tableData);
                // table.styleBuiltIn = Word.BuiltInStyleName.gridTable5Dark_Accent2;
                // Synchronize the document state by executing the queued commands
                await context.sync();
            });

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    async function getFilesInfo() {
        try {
            const response = await fetch('https://localhost:7129/api/Files');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const filesData = await response.json();
            console.log('Files Information:', filesData);

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }



    async function findAndReplace() {
        try {
            
            const clientData = await getClientDataFromDatabase();

           
            await replaceMe('<<FirstName>>', clientData.firstName);
            await replaceMe('<<LastName>>', clientData.lastName);
            await replaceMe('<<adress>>', clientData.adress);
            await replaceMe('<<CNP>>', clientData.CNP);


        } catch (error) {
            console.error('Error during findAndReplace:', error);
        }
    }

    async function getClientDataFromDatabase() {
        try {
            const response = await fetch('https://localhost:7129/api/Client/1');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const clientData = await response.json();
            console.log('Client Information:', clientData);
            return clientData;
        } catch (error) {
            console.error('Error during getClientDataFromDatabase:', error);
           
            return { firstName: "Name", lastName: "Lastname", adress: "adress", CNP: "CNP" };
        }
    }

    async function replaceMe(whatToFind, whatToReplaceWith) {
        try {
            await Word.run(async (context) => {
                const searchResults = context.document.body.search(whatToFind, { matchCase: false });
                context.load(searchResults, 'text, font');
                await context.sync();

                for (let i = 0; i < searchResults.items.length; i++) {
                    searchResults.items[i].insertText(whatToReplaceWith, 'Replace');
                }

                await context.sync();
            });
        } catch (error) {
            console.log('Error during replaceMe:', error);
            if (error instanceof OfficeExtension.Error) {
                console.log('Debug info:', error.debugInfo);
            }
        }
    }




//    //async function findAndReplace() {
//    //    try {
//    //        const firstNameReplacement = await getFirstNameReplacementFromDatabase();
//    //        await replaceMe('<<FirstName>>', firstNameReplacement);
//    //    } catch (error) {
//    //        console.error('Error during findAndReplace:', error);
//    //    }
//    //}

//    //async function getFirstNameReplacementFromDatabase() {
//    //    try {
//    //        const response = await fetch('https://localhost:7129/api/Client/1');
//    //        if (!response.ok) {
//    //            throw new Error('Network response was not ok');
//    //        }
//    //        const clientData = await response.json();
//    //        console.log('Client Information:', clientData);
//    //        return clientData.firstName;
//    //    } catch (error) {
//    //        console.error('Error during getFirstNameReplacementFromDatabase:', error);
//    //        return "Name";
//    //    }
//    //}

//    //async function replaceMe(whatToFind, whatToReplaceWith) {
//    //    try {
//    //        await Word.run(async (context) => {
//    //            const searchResults = context.document.body.search(whatToFind, { matchCase: false });
//    //            context.load(searchResults, 'text, font');
//    //            await context.sync();

//    //            for (let i = 0; i < searchResults.items.length; i++) {
//    //                searchResults.items[i].insertText(whatToReplaceWith, 'Replace');
//    //            }

//    //            await context.sync();
//    //        });
//    //    } catch (error) {
//    //        console.log('Error during replaceMe:', error);
//    //        if (error instanceof OfficeExtension.Error) {
//    //            console.log('Debug info:', error.debugInfo);
//    //        }
//    //    }
//    //}




//    //Functie replaceme(whatToFind, whatToReplaceWith) { }

//    //replaceMe(<< NANME >>, yourobject.name)
//    //replaceMe(<< PRENUME >>, yourobject.surname)



//})();