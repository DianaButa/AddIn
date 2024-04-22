
'use strict';


Office.onReady(function () {
    $(document).ready(function () {
        console.log("getClientInfo");
        // The document is ready.
        // Use this to check whether the API is supported in the Word client.
        if (Office.context.requirements.isSetSupported('WordApi', '1.1')) {
            $('#client').on("click", getClientInfo);
            $('#documents').on("click", getDocumentsInfo);
            $('#files').on("click", getFilesInfo);
            $('#findandreplace').on("click", findAndReplace);
            $('#sendEmail').on("click", sendEmail);
            $('#supportedVersion').html('This code is using Word 2016 or later.');
        } else {
            // Lets you know that this code will not work with your version of Word.
            $('#supportedVersion').html('This code requires Word 2016 or later.');
        }
    });
});

function sendEmail() {
    Word.run(function (context) {
        var selectedRange = context.document.getSelection();
        selectedRange.load("text");
        return context.sync()
            .then(function () {
                var selectedText = selectedRange.text;
                if (!selectedText.trim()) {
                    console.error('No text selected.');
                    $('#message').text("No text selected. Please select some text before sending an email.");
                    return;
                }
                var emailAddress = $('#email').val(); 
                if (!emailAddress) {
                    console.error('Email address is required.');
                    $('#message').text("Email address is required.");
                    return;
                }
                // AJAX call to API project to send email
                $.ajax({
                    url: 'https://localhost:7129/api/Client/sendemail',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ Email: emailAddress, SelectedText: selectedText }),
                    success: function (response) {
                        console.log("Email sent successfully!");
                        $('#message').text("Email sent successfully!");
                    },
                    error: function (xhr, status, error) {
                        console.error('Error sending email:', error);
                        if (xhr.status === 401) {
                            $('#message').text("Authentication error. Please log in and try again.");
                        } else if (xhr.status === 500) {
                            $('#message').text("Server error. Please try again later.");
                        } else {
                            $('#message').text("Error sending email. Please try again later.");
                        }
                    }
                });
            });
    }).catch(function (error) {
        console.error('Error:', error);
        $('#message').text("Error: Unable to retrieve selected text. Please try again later.");
    });
}








$(document).ready(function () {
    var $select = $('#mySelect');
    $select.empty();
    $select.append($('<option></option>').text('Selecteaza un nume').attr('disabled', 'disabled').attr('selected', 'selected'));

    $.ajax({
        url: 'https://localhost:7129/api/Client',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log('Data received:', data);
            $.each(data, function (key, value) {
                $select.append($('<option></option>').val(value.id).text(value.firstName + ' ' + value.lastName));
            });
            $select.append($('<option></option>').val('inputOption').text('Introdu numele...'));
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
    $('#mySelect').change(function () {
        var selectedClientId = $(this).val();
        if (selectedClientId === 'inputOption') {
            $('#inputName').show().focus();
        } else {
            $('#inputName').hide();
            findAndReplace(selectedClientId);
        }
    });
    $('#inputName').on('input', function () {
        var inputName = $(this).val().toLowerCase();
        $select.find('option').each(function () {
            var optionText = $(this).text().toLowerCase();
            if (optionText.includes(inputName)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        $select.attr('size', $select.find('option:visible').length + 1);
        $select.attr('open', 'open');
    });
    $('#inputName').focus(function () {
        $select.attr('size', $select.find('option:visible').length + 1);
        $select.attr('open', 'open');
    });
    $('#inputName').blur(function () {
        $select.removeAttr('size');
        $select.removeAttr('open');
    });
});



function findAndReplace(selectedClientId) {
    console.log('Selected client ID:', selectedClientId);
}


function findAndReplaceByName(clientName) { 
    console.log('Input client name:', clientName);
}



async function findAndReplace(selectedClientId) {
    try {
        const placeholders = ['<<FirstName>>', '<<LastName>>', '<<Adress>>', '<<CNP>>', '<<Date>>'];
        const response = await fetch(`https://localhost:7129/api/Client/${selectedClientId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch client data');
        }
        const clientData = await response.json();
        console.log('Client Information:', clientData);

        await Word.run(async (context) => {
            const body = context.document.body;
            for (let i = 0; i < placeholders.length; i++) {
                const placeholder = placeholders[i];
                const searchResults = body.search(placeholder, { matchCase: false });
                context.load(searchResults, 'text, font');

                await context.sync();

                if (searchResults.items.length > 0) {
                    let replacement;
                    switch (placeholder) {
                        case '<<FirstName>>':
                            replacement = clientData.firstName;
                            break;
                        case '<<LastName>>':
                            replacement = clientData.lastName;
                            break;
                        case '<<Adress>>':
                            replacement = clientData.adress;
                            break;
                        case '<<CNP>>':
                            replacement = clientData.cnp;
                            break;
                        case '<<Date>>':
                            replacement = new Date().toLocaleDateString(); 
                            break;
                        default:
                            replacement = '';
                            break;
                    }

                    console.log(`Replacement value for "${placeholder}" is ${replacement}`);

                    searchResults.items.forEach((item) => {
                        try {
                            item.insertText(replacement, Word.InsertLocation.replace);
                        } catch (insertError) {
                            console.error('Error during insertText:', insertError);
                        }
                    });
                }
            }
        });
    } catch (error) {
        console.error('Error during findAndReplace:', error);
    }
}













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
        const documentsData = await response.json();
        console.log('Documents Information:', documentsData);

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








