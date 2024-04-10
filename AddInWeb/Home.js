'use strict';

(function () {

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
                $('#supportedVersion').html('This code is using Word 2016 or later.');
            } else {
                // Lets you know that this code will not work with your version of Word.
                $('#supportedVersion').html('This code requires Word 2016 or later.');
            }
        });
    });


    //async function getClientInfo() {
    //    console.log("getClientInfo");
    //    try {
    //        const response = await fetch('https://localhost:7129/api/Client');
    //        if (!response.ok) {
    //            throw new Error('Network response was not ok');
    //        }
    //        const clientData = await response.json();
    //        console.log('Client Information:', clientData);
    //        // Handle the client data as needed
    //    } catch (error) {
    //        console.error('There was a problem with the fetch operation:', error);
    //    }
    //}

    //async function getClientInfo() {
    //    try {
    //        const response = await fetch('https://localhost:7129/api/Client');
    //        if (!response.ok) {
    //            throw new Error('Network response was not ok');
    //        }
    //        const clientData = await response.json();
    //        console.log('Client Information:', clientData);

    //        // Use the Word JavaScript API to insert the client information into the document
    //        Word.run(async (context) => {
    //            // Queue a command to insert the client information into the document
    //            const body = context.document.body;
    //            clientData.forEach((client) => {
    //                body.insertText(`ID: ${client.id}\n`, 'end');
    //                body.insertText(`First Name: ${client.firstName}\n`, 'end');
    //                body.insertText(`Last Name: ${client.lastName}\n`, 'end');
    //                body.insertText(`Address: ${client.address}\n`, 'end');
    //                body.insertText('\n', 'end');
    //            });

    //            // Synchronize the document state by executing the queued commands
    //            await context.sync();
    //        });

    //    } catch (error) {
    //        console.error('There was a problem with the fetch operation:', error);
    //    }
    //}





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
                    tableData.push([client.id,client.firstName, client.lastName, client.adress]);
                });

                const table = context.document.body.insertTable(clientData.length, 4, "Start", tableData);
               // table.styleBuiltIn = Word.BuiltInStyleName.gridTable5Dark_Accent2;
                // Synchronize the document state by executing the queued commands
                await context.sync();
            });

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }



    //async function getClientInfo() {
    //    try {
    //        const response = await fetch('https://localhost:7129/api/Client');
    //        if (!response.ok) {
    //            throw new Error('Network response was not ok');
    //        }
    //        const clientData = await response.json();
    //        console.log('Client Information:', clientData);

    //        // Use the Word JavaScript API to insert the client information into the document
    //        Word.run(async (context) => {
    //            // Queue a command to insert the client information at the current selection in the document
    //            const range = context.document.getSelection();
    //            range.insertText(JSON.stringify(clientData), 'End');

    //            // Synchronize the document state by executing the queued commands
    //            await context.sync();
    //        });

    //    } catch (error) {
    //        console.error('There was a problem with the fetch operation:', error);
    //    }
    //}





    async function getDocumentsInfo() {
        try {
            const response = await fetch('https://localhost:7129/api/Documents');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const documentsData = await response.json();
            console.log('Documents Information:', documentsData);
            // Handle the documents data as needed
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
            // Handle the files data as needed
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

})();
