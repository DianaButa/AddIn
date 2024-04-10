//'use strict';

//(function () {

//    Office.onReady(function () {
//        // Office is ready.
//        $(document).ready(function () {
//            // The document is ready.
//            // Use this to check whether the API is supported in the Word client.
//            if (Office.context.requirements.isSetSupported('WordApi', '1.1')) {
//                // Do something that is only available via the new APIs.
//                $('#getUser').on("click", getUserInfo);
//                $('#getClient').on("click", getClientInfo);
//                $('#getCompanyClient').on("click", getCompanyClientInfo);
//                $('#getDocuments').on("click", getDocumentsInfo);
//                $('#getFiles').on("click", getFilesInfo);
//                // Add event listeners for other actions as needed
//            } else {
//                // Lets you know that this code will not work with your version of Word.
//                $('#supportedVersion').html('This code requires Word 2016 or later.');
//            }
//        });
//    });

//    async function getUserInfo() {
//        try {
//            const response = await fetch('https://localhost:7129/api/User');
//            if (!response.ok) {
//                throw new Error('Network response was not ok');
//            }
//            const userData = await response.json();
//            console.log('User Information:', userData);
//            // Handle the user data as needed
//        } catch (error) {
//            console.error('There was a problem with the fetch operation:', error);
//        }
//    }

//    async function getClientInfo() {
//        try {
//            const response = await fetch('https://localhost:7129/api/Client');
//            if (!response.ok) {
//                throw new Error('Network response was not ok');
//            }
//            const clientData = await response.json();
//            console.log('Client Information:', clientData);
//            // Handle the client data as needed
//        } catch (error) {
//            console.error('There was a problem with the fetch operation:', error);
//        }
//    }

//    async function getCompanyClientInfo() {
//        try {
//            const response = await fetch('https://localhost:7129/api/CompanyClient');
//            if (!response.ok) {
//                throw new Error('Network response was not ok');
//            }
//            const companyClientData = await response.json();
//            console.log('Company Client Information:', companyClientData);
//            // Handle the company client data as needed
//        } catch (error) {
//            console.error('There was a problem with the fetch operation:', error);
//        }
//    }

//    async function getDocumentsInfo() {
//        try {
//            const response = await fetch('https://localhost:7129/api/Documents');
//            if (!response.ok) {
//                throw new Error('Network response was not ok');
//            }
//            const documentsData = await response.json();
//            console.log('Documents Information:', documentsData);
//            // Handle the documents data as needed
//        } catch (error) {
//            console.error('There was a problem with the fetch operation:', error);
//        }
//    }

//    async function getFilesInfo() {
//        try {
//            const response = await fetch('https://localhost:7129/api/Files');
//            if (!response.ok) {
//                throw new Error('Network response was not ok');
//            }
//            const filesData = await response.json();
//            console.log('Files Information:', filesData);
//            // Handle the files data as needed
//        } catch (error) {
//            console.error('There was a problem with the fetch operation:', error);
//        }
//    }

//})();
'use strict';

(function () {

    Office.onReady(function () {
        // Office is ready.
        $(document).ready(function () {
            // The document is ready.
            // Use this to check whether the API is supported in the Word client.
            if (Office.context.requirements.isSetSupported('WordApi', '1.1')) {
                // Do something that is only available via the new APIs.
                $('#emerson').on("click", insertEmersonQuoteAtSelection);
                $('#checkhov').on("click", insertChekhovQuoteAtTheBeginning);
                $('#proverb').on("click", insertChineseProverbAtTheEnd);
                $('#supportedVersion').html('This code is using Word 2016 or later.');
            } else {
                // Lets you know that this code will not work with your version of Word.
                $('#supportedVersion').html('This code requires Word 2016 or later.');
            }
        });
    });

    async function insertEmersonQuoteAtSelection() {
        await Word.run(async (context) => {

            // Create a proxy object for the document.
            const thisDocument = context.document;

            // Queue a command to get the current selection.
            // Create a proxy range object for the selection.
            const range = thisDocument.getSelection();

            // Queue a command to replace the selected text.
            range.insertText('"Hitch your wagon to a star." - Ralph Waldo Emerson\n', Word.InsertLocation.replace);

            // Synchronize the document state by executing the queued commands,
            // and return a promise to indicate task completion.
            await context.sync();
            console.log('Added a quote from Ralph Waldo Emerson.');
        })
            .catch(function (error) {
                console.log('Error: ' + JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    console.log('Debug info: ' + JSON.stringify(error.debugInfo));
                }
            });
    }

    async function insertChekhovQuoteAtTheBeginning() {
        await Word.run(async (context) => {

            // Create a proxy object for the document body.
            const body = context.document.body;

            // Queue a command to insert text at the start of the document body.
            body.insertText('"Knowledge is of no value unless you put it into practice." - Anton Chekhov\n', Word.InsertLocation.start);

            // Synchronize the document state by executing the queued commands,
            // and return a promise to indicate task completion.
            await context.sync();
            console.log('Added a quote from Anton Chekhov.');
        })
            .catch(function (error) {
                console.log('Error: ' + JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    console.log('Debug info: ' + JSON.stringify(error.debugInfo));
                }
            });
    }

    async function insertChineseProverbAtTheEnd() {
        await Word.run(async (context) => {

            // Create a proxy object for the document body.
            const body = context.document.body;

            // Queue a command to insert text at the end of the document body.
            body.insertText('"To know the road ahead, ask those coming back." - Chinese proverb\n', Word.InsertLocation.end);

            // Synchronize the document state by executing the queued commands,
            // and return a promise to indicate task completion.
            await context.sync();
            console.log('Added a quote from a Chinese proverb.');
        })
            .catch(function (error) {
                console.log('Error: ' + JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    console.log('Debug info: ' + JSON.stringify(error.debugInfo));
                }
            });
    }
})();
