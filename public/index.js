$(document).ready(function () {

    let childcount = 1;
    const maxchildren = 6;


    $("#phone").on("input", function () {
        let input = $(this).val().split("-").join("");
        let formatted = "";

        if (input.length > 3 && input.length <= 6) {
            formatted = input.slice(0, 3) + "-" + input.slice(3);
        } else if (input.length > 6) {
            formatted = input.slice(0, 3) + "-" + input.slice(3, 6) + "-" + input.slice(6, 10);
        } else {
            formatted = input;
        }

        $(this).val(formatted);
    });

    $('#child1').on('input', function () {
        const name = $(this).val().trim();
        $(`#order-title`).text(`Uniform Items for ${name || `Uniform Items`}`);
    });



    $('#add-child').on('click', () => {
        if (childcount >= maxchildren) {
            alert('Max amount of children reached')
            return;
        }

        const lastChildName = $(`#child${childcount}`).val().trim();
        if (!lastChildName) {
            alert(`Please enter a name for Child ${childcount} before adding another child.`);
            return;
        };

        childcount++;



        const newchild = `
        <div class= "extra-child">
        <label for="child${childcount}">Child ${childcount} Name:</label>
                <input type="text" id="child${childcount}" required><br><br>
                </div>`;
        $('#children').append(newchild);

        const newChildOrder = `
        <div class="extra-child">
               <div id="itemsToOrder${childcount}" class="form-group">
                <h2 id="childHeader${childcount}">Uniform Items for ${childcount}</h2>

                <div class="uniform-item">
                    <label>Shirts</label>
                    <select name="shirtSize${childcount}" id="shirtSize${childcount}">
                        <option value="" style="display: none;">Select Size</option>
                        <option value="4">Size 4</option>
                        <option value="6">Size 6</option>
                        <option value="8">Size 8</option>
                        <option value="10">Size 10</option>
                        <option value="12">Size 12</option>
                    </select>
                    <input type="number" name="shirtQuantity${childcount}" min="0" max="4" value="0">
                </div>


                <div class="uniform-item">
                    <label>Skirts</label>
                    <select name="skirtSize${childcount}" id="skirtSize${childcount}">
                        <option value="" style="display: none;">Select Size</option>
                        <option value="4">Size 4</option>
                        <option value="6">Size 6</option>
                        <option value="8">Size 8</option>
                        <option value="10">Size 10</option>
                        <option value="12">Size 12</option>
                    </select>
                    <input type="number" name="skirtQuantity${childcount}" min="0" max="4" value="0">
                </div>

                <div class="uniform-item">
                    <label>Sweatshirts</label>
                    <select name="sweatshirtSize${childcount}" id="sweathirtSize${childcount}">
                        <option value="" style="display: none;">Select Size</option>
                        <option value="4">Size 4</option>
                        <option value="6">Size 6</option>
                        <option value="8">Size 8</option>
                        <option value="10">Size 10</option>
                        <option value="12">Size 12</option>
                    </select>
                    <input type="number" name="sweatshirtQuantity${childcount}" min="0" max="4" value="0">
                </div>

                <div class="uniform-item">
                    <label>Jumpers</label>
                    <select name="jumperSize${childcount}" id="jumperSize${childcount}">
                        <option value="" style="display: none;">Select Size</option>
                        <option value="4">Size 4</option>
                        <option value="6">Size 6</option>
                        <option value="8">Size 8</option>
                        <option value="10">Size 10</option>
                        <option value="12">Size 12</option>
                    </select>
                    <input type="number" name="jumperQuantity${childcount}" min="0" max="4" value="0">
                </div>
            </div>
            </div>`;

        $('#itemsToOrder').append(newChildOrder);

        $(`#child${childcount}`).on('input', function () {
            const name = $(this).val().trim();
            $(`#childHeader${childcount}`).text(`Uniform Items for ${name || `Child ${childcount}`}`)
        });



    });


    function gatherChildren() {
        children = [];
        for (let i = 1; i <= childcount; i++) {
            const childName = $(`#child${i}`).val().trim();
            if (childName) {
                const childData = {
                    childname: childName,
                    skirts: {
                        size: $(`#skirtSize${i}`).val(),
                        quantity: $(`input[name="skirtQuantity${i}"]`).val()
                    },
                    shirts: {
                        size: $(`#shirtSize${i}`).val(),
                        quantity: $(`input[name="shirtQuantity${i}"]`).val()
                    },
                    sweatshirts: {
                        size: $(`#sweathirtSize${i}`).val(),
                        quantity: $(`input[name="sweatshirtQuantity${i}"]`).val()
                    },
                    jumpers: {
                        size: $(`#jumperSize${i}`).val(),
                        quantity: $(`input[name="jumperQuantity${i}"]`).val()
                    }
                };
                
                children.push(childData);
            }
        }
    }


    $('#preorder-form').on('submit', async function (e) {
        e.preventDefault();
        gatherChildren();
        
       

        const formData = {
            parentname: $('#ParentName').val().trim(),
            lastname: $('#lastName').val().trim(),
            phone: $('#phone').val().trim(),
            paid: $('#paid').is(':checked'),
            children,
        };

        for (const child of children) {
            const backdata = {
                lastname: $('#lastName').val().trim(),
                mothersname: $('#ParentName').val().trim(),
                childsname: child.childname,
                phone: $('#phone').val().trim(),
                shirt: child.shirts.quantity > 0 ? child.shirts.quantity : "",
                shirtsize: child.shirts.quantity > 0 ? child.shirts.size : "",
                skirt: child.skirts.quantity > 0 ? child.skirts.quantity : "",
                skirtsize: child.skirts.quantity > 0 ? child.skirts.size : "",
                jumper: child.jumpers.quantity > 0 ? child.jumpers.quantity : "",
                jumpersize: child.jumpers.quantity > 0 ? child.jumpers.size : "",
                sweatshirt: child.sweatshirts.quantity > 0 ? child.sweatshirts.quantity : "",
                sweatshirtsize: child.sweatshirts.quantity > 0 ? child.sweatshirts.size : "",
                paid: $('#paid').is(':checked'),
            };

           

            try {
                const response = await fetch('/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(backdata)
                });
                if (!response.ok) {
                    throw new Error('something went wrong');
                }
            } catch (error) {
                console.error('Network error', error);
            }
        }

        generatePDF(formData);
        resetFormFields();
    });

    function generatePDF(data) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        //border
        doc.setDrawColor(0);
        doc.setLineWidth(1);
        doc.roundedRect(5, 5, pageWidth - 10, pageHeight - 10, 10, 10, "S")

    
        //big font for header
        doc.setFontSize(20);
        let title = "Mrs. Adele Raful Uniform Gemach Order Form"
        let titleWidth = doc.getTextWidth(title);
        doc.text(title, (pageWidth - titleWidth) / 2, 20);

        let lastname = data.lastname;
        let lastnameWidth = doc.getTextWidth(lastname);
        doc.text(lastname, (pageWidth - lastnameWidth) / 2, 35);


        //reset font size
        doc.setFontSize(14);

        
        let y = 55;
        doc.text(`Mother's Name: ${data.parentname}`, 20, y);
        y += 10;
        doc.text(`Phone Number: ${data.phone}`, 20, y);
        y += 10;

        const col1X = 20;
        const col2X = pageWidth / 2;
        let col1Y = y;
        let col2Y = y;
        
        // children information
        data.children.forEach((child, index) => {
            const childInfo = `
            Child ${index + 1}: ${child.childname}\n
            Shirts: Size ${child.shirts.size} - Quantity: ${child.shirts.quantity}\n
            Skirts: Size ${child.skirts.size} - Quantity: ${child.skirts.quantity}\n
            Sweatshirts: Size ${child.sweatshirts.size} - Quantity: ${child.sweatshirts.quantity}\n
            Jumpers: Size ${child.jumpers.size} - Quantity: ${child.jumpers.quantity}\n
        `;

            // Check which column to place the next child’s info in
            if (index % 2 === 0) {
                // Place in the first column
                doc.text(childInfo, col1X, col1Y);
                col1Y += 60; // Increase the Y position for the next child in column 1
            } else {
                // Place in the second column
                doc.text(childInfo, col2X, col2Y);
                col2Y += 60; // Increase the Y position for the next child in column 2
            }

            // Check if content overflows and need a new page
            // if (col1Y > pageHeight - 50 || col2Y > pageHeight - 50) {
            //     doc.addPage();
            //     col1Y = 20;
            //     col2Y = 20;
            // }
        });

        //y+=10;
       
        
        // if (partialPayment > 0) {
        //     doc.text(`Partial Payment: $${data.partialPayment}`,20,y);
        // y+=5;
        //doc.text(`Remaining Balance: $${data.totalPrice - data.partialPayment}`,20,y)
        //}
        


        doc.setFont('old_stamper', 'normal').setFontSize(60).setTextColor(255, 0, 0);

        let paid = "PAID";
        if (data.paid === true) {
            doc.text(paid, pageWidth / 2, pageHeight / 2, 30, 10);
        } else {
            doc.text(`Not Paid`, pageWidth / 2, pageHeight / 2, 30, 10);
        }
        doc.output('dataurlnewwindow', `${data.parentname} ${data.lastname}`)

    }

    function resetFormFields() {
        $('#ParentName').val('');
        $('#child1').val('');
        $('#lastName').val('');
        $(`#order-title`).text(`Uniform Items`);
        $('select[name="skirtSize"]').val('');
        $('input[name="skirtQuantity"]').val('');
        $('select[name="shirtSize"]').val('');
        $('input[name="shirtQuantity"]').val('');
        $('select[name="sweatshirtSize"]').val('');
        $('input[name="sweatshirtQuantity"]').val('');
        $('select[name="jumperSize"]').val('');
        $('input[name="jumperQuantity"]').val('');
        $('#phone').val('');
        $('#paid').prop('checked', false);
        $('.extra-child').remove();
        $('#partialPayment').val('');
        childcount = 1;
    };

    
})