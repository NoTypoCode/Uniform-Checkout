$(document).ready(function () {


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

    $('#ChildName').on('input', function () {
        const name = $(this).val().trim();
        $(`#order-title`).text(`Uniform Items for ${name || `Uniform Items`}`);
    });

    let childcount = 1;
    const maxchildren = 6;

    $('#add-child').on('click', () => {
        if (childcount >= maxchildren) {
            alert('Max amount of children reached')
            return;
        }

        childcount++;

        const newchild = `
        <div class= "extra-child">
        <label for="ChildName${childcount}">Child ${childcount} Name:</label>
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



    $('#preorder-form').on('submit', async function (e) {
        e.preventDefault();


        const formData = {
            parentname: $('#ParentName').val().trim(),

            childname: $('#ChildName').val().trim(),

            lastname: $('#lastName').val().trim(),

            skirts: {
                size: $('select[name="skirtSize"]').val(),
                quantity: $('input[name= "skirtQuantity"]').val()
            },

            shirts: {
                size: $('select[name="shirtSize"]').val(),
                quantity: $('input[name= "shirtQuantity"]').val()
            },

            sweatshirts: {
                size: $('select[name="sweatshirtSize"]').val(),
                quantity: $('input[name= "sweatshirtQuantity"]').val()
            },

            jumpers: {
                size: $('select[name="jumperSize"]').val(),
                quantity: $('input[name= "jumperQuantity"]').val()
            },

            phone: $('#phone').val().trim(),

            paid: $('#paid').is(':checked')
        };



        const backdata = {
            lastname: formData.lastname,
            mothersname: formData.parentname,
            childsname: formData.childname,
            phone: formData.phone,
            shirt: formData.shirts.quantity > 0 ? formData.shirts.quantity : "",
            shirtsize: formData.shirts.quantity > 0 ? formData.shirts.size : "",
            skirt: formData.skirts.quantity > 0 ? formData.skirts.quantity : "",
            skirtsize: formData.skirts.quantity > 0 ? formData.skirts.size : "",
            jumper: formData.jumpers.quantity > 0 ? formData.jumpers.quantity : "",
            jumpersize: formData.jumpers.quantity > 0 ? formData.jumpers.size : "",
            sweatshirt: formData.sweatshirts.quantity > 0 ? formData.sweatshirts.quantity : "",
            sweatshirtsize: formData.sweatshirts.quantity > 0 ? formData.sweatshirts.size : "",
            paid: formData.paid
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
            };
        } catch (error) {
            console.error('network error');
        }

        generatePDF(formData);
        resetFormFields();

    })


    function generatePDF(data) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        //border
        doc.setDrawColor(0);
        doc.setLineWidth(1);
        doc.roundedRect(5, 5, pageWidth - 10, pageHeight - 10, 10, 10, "S")

        //reset the line for form underline later
        doc.setLineWidth(.3);


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
        doc.text(`Mothers Name: ${data.parentname}        Child Name: ${data.childname}`, 20, y);
        //doc.line(20, y+1, pageWidth-90, y+1);
        y += 10

        // doc.text(`Child Name: ${data.childname}`, 20, y);
        // doc.line(20, y+1, pageWidth-90, y+1);
        // y+=10;


        doc.text(`Phone Number: ${data.phone}`, 20, y);
        // doc.line(20, y+1, pageWidth-90, y+1);
        y += 10


        y += 30;

        if (data.shirts.quantity > 0) {
            doc.text(`Shirts : Size ${data.shirts.size} - Quantity: ${data.shirts.quantity}`, 20, y);
            y += 10;
        }

        if (data.skirts.quantity > 0) {
            doc.text(`Skirts : Size ${data.skirts.size} - Quantity: ${data.skirts.quantity}`, 20, y);
            y += 10;
        }

        if (data.sweatshirts.quantity > 0) {
            doc.text(`Sweatshirts : Size ${data.sweatshirts.size} - Quantity: ${data.sweatshirts.quantity}`, 20, y);
            y += 10;
        }

        if (data.jumpers.quantity > 0) {
            doc.text(`Jumpers : Size ${data.jumpers.size} - Quantity: ${data.jumpers.quantity}`, 20, y);
            y += 10;
        }


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
        $('#ChildName').val('');
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
        childcount = 1;
    }

})