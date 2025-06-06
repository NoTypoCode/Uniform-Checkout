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
        $(`#order-title`).text(`Uniform Items for ${capitalizeWords(name) || `Uniform Items`}`);
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
        <div class= "extra-child" id="child-container${childcount}">
        <label for="child${childcount}">Child ${childcount} Name:</label>
        <div class= "input-button-row">
                <input type="text" id="child${childcount}" required>
                <button type="button" class="remove-child">Remove Child ${childcount}</button>
                </div>
                </div>`;
        $('#children').append(newchild);

        const newChildOrder = `
        <div class="extra-child" id="order-items${childcount}">
               <div id="itemsToOrder${childcount}" class="form-group">
                <h2 id="childHeader${childcount}">Uniform Items for ${childcount}</h2>

                <div class="uniform-item">
                    <label>Shirts</label>
                    <select name="shirtSize${childcount}" id="shirtSize${childcount}">
                        <option value="" style="display: none;">Select Size</option>
                        <option value="6">Size 6</option>
                        <option value="8">Size 8</option>
                        <option value="10">Size 10</option>
                        <option value="12">Size 12</option>
                        <option value="14">Size 14</option>
                        <option value="16">Size 16</option>
                    </select>
                    <input type="number" name="shirtQuantity${childcount}" min="0" max="4" value="">
                </div>


                <div class="uniform-item">
                    <label>Skirts</label>
                    <select name="skirtSize${childcount}" id="skirtSize${childcount}">
                       <option value="" style="display: none;">Select Size</option>
                        <option value="5">Size 5</option>
                        <option value="5L">Size 5L</option>
                        <option value="6">Size 6</option>
                        <option value="6L">Size 6L</option>
                        <option value="6XL">Size 6XL</option>
                        <option value="7">Size 7</option>
                        <option value="7L">Size 7L</option>
                        <option value="8">Size 8</option>
                        <option value="8L">Size 8L</option>
                        <option value="10">Size 10</option>
                        <option value="10L">Size 10L</option>
                        <option value="12">Size 12</option>
                        <option value="12L">Size 12L</option>
                        <option value="1205L">Size 12.5L</option>
                        <option value="14">Size 14</option>
                        <option value="14L">Size 14L</option>
                        <option value="14.5L">Size 14.5L</option>
                        <option value="16L">Size 16L</option>
                        <option value="16.5L">Size 16.5L</option>
                        <option value="18L">Size 18L</option>
                        <option value="18.5L">Size 18.5L</option>
                    </select>
                    <input type="number" name="skirtQuantity${childcount}" min="0" max="4" value="">
                </div>

                <div class="uniform-item">
                    <label>Sweatshirts</label>
                    <select name="sweatshirtSize${childcount}" id="sweatshirtSize${childcount}">
                        <option value="" style="display: none;">Select Size</option>
                        <option value="5/6">Size 5/6</option>
                        <option value="7/8">Size 7/8</option>
                        <option value="10/12">Size 10/12</option>
                        <option value="14/16">Size 14/16</option>
                    </select>
                    <input type="number" name="sweatshirtQuantity${childcount}" min="0" max="4" value="">
                </div>

                <div class="uniform-item">
                    <label>Jumpers</label>
                    <select name="jumperSize${childcount}" id="jumperSize${childcount}">
                        <option value="" style="display: none;">Select Size</option>
                        <option value="5">Size 5</option>
                        <option value="6">Size 6</option>
                        <option value="6X">Size 6X</option>
                        <option value="7">Size 7</option>
                        <option value="8">Size 8</option>
                        <option value="10">Size 10</option>
                        <option value="12">Size 12</option>
                        <option value="14">Size 14</option>
                    </select>
                    <input type="number" name="jumperQuantity${childcount}" min="0" max="4" value="">
                </div>
            </div>
            </div>`;

        $('#itemsToOrder').append(newChildOrder);

        $(`#child${childcount}`).on('input', function () {
            const name = $(this).val().trim();
            $(`#childHeader${childcount}`).text(`Uniform Items for ${capitalizeWords(name) || `Child ${childcount}`}`)
        });
    });

    $(document).on('click', '.remove-child', function () {
        // Find all child containers after the one being removed
        const removedId = parseInt($(this).closest('.extra-child').attr('id').replace('child-container', ''));

        // Remove the current child's containers
        $(`#child-container${removedId}`).remove();
        $(`#order-items${removedId}`).remove();

        // Renumber remaining children
        for (let i = removedId + 1; i <= childcount; i++) {
            // Update container IDs and content
            $(`#child-container${i}`).attr('id', `child-container${i - 1}`);
            $(`#child${i}`).attr('id', `child${i - 1}`);
            $(`#order-items${i}`).attr('id', `order-items${i - 1}`);
            $(`#itemsToOrder${i}`).attr('id', `itemsToOrder${i - 1}`);
            $(`#childHeader${i}`).attr('id', `childHeader${i - 1}`);

            // Update form elements
            $(`select[name="shirtSize${i}"]`).attr('name', `shirtSize${i - 1}`);
            $(`input[name="shirtQuantity${i}"]`).attr('name', `shirtQuantity${i - 1}`);
            $(`select[name="skirtSize${i}"]`).attr('name', `skirtSize${i - 1}`);
            $(`input[name="skirtQuantity${i}"]`).attr('name', `skirtQuantity${i - 1}`);
            $(`select[name="sweatshirtSize${i}"]`).attr('name', `sweatshirtSize${i - 1}`);
            $(`input[name="sweatshirtQuantity${i}"]`).attr('name', `sweatshirtQuantity${i - 1}`);
            $(`select[name="jumperSize${i}"]`).attr('name', `jumperSize${i - 1}`);
            $(`input[name="jumperQuantity${i}"]`).attr('name', `jumperQuantity${i - 1}`);

            // Update text content
            $(`label[for="child${i}"]`).text(`Child ${i - 1} Name:`);
            $(`#childHeader${i - 1}`).text(`Uniform Items for Child ${i - 1}`);
            $(`#child-container${i - 1} .remove-child`).text(`Remove Child ${i - 1}`);

            // Update the child name in header if it exists
            const childName = $(`#child${i - 1}`).val().trim();
            if (childName) {
                $(`#childHeader${i - 1}`).text(`Uniform Items for ${childName}`);
            }
        }

        childcount--;
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
                        size: $(`#sweatshirtSize${i}`).val(),
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

    const pricePerItem = 15; // all item costs $15

    function updateTotalPrice() {
        let total = 0;
        const quantityInputs = $('input[type="number"][name*="Quantity"]');

        quantityInputs.each(function () {
            const quantity = parseInt($(this).val()) || 0;
            total += quantity * pricePerItem;
        });

        $('#total-price').text(`Total: $${total.toFixed(2)}`);
        return total;
    }

    // price update for all children
    $(document).on('input', '[name*="Quantity"]', updateTotalPrice);

    $('#paid').on("change", function () {
        if ($(this).is(":checked")) {
            $("#partialPayment").prop("disabled", true).val("");
        } else {
            $("#partialPayment").prop("disabled", false);
        }
    });

    $('#preorder-form').on('submit', async function (e) {
        e.preventDefault();

        gatherChildren();
        const totalPrice = updateTotalPrice();
        const partialPayment = parseFloat($('#partialPayment').val()) || 0;

        const formData = {
            parentname: $('#ParentName').val().trim(),
            lastname: $('#lastName').val().trim(),
            phone: $('#phone').val().trim(),
            paid: $('#paid').is(':checked'),
            children,
            totalPrice: totalPrice,
            partialPayment: partialPayment
        };

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const isLast = i === children.length - 1;

            const backdata = {
                lastname: capitalizeWords($('#lastName').val().trim()),
                mothersname: capitalizeWords($('#ParentName').val().trim()),
                childsname: capitalizeWords(child.childname),
                phone: $('#phone').val().trim(),
                shirt: child.shirts.quantity && child.shirts.size ? child.shirts.quantity : "",
                shirtsize: child.shirts.quantity && child.shirts.size ? child.shirts.size : "",
                skirt: child.skirts.quantity && child.skirts.size ? child.skirts.quantity : "",
                skirtsize: child.skirts.quantity && child.skirts.size ? child.skirts.size : "",
                jumper: child.jumpers.quantity && child.jumpers.size ? child.jumpers.quantity : "",
                jumpersize: child.jumpers.quantity && child.jumpers.size ? child.jumpers.size : "",
                sweatshirt: child.sweatshirts.quantity && child.sweatshirts.size ? child.sweatshirts.quantity : "",
                sweatshirtsize: child.sweatshirts.quantity && child.sweatshirts.size ? child.sweatshirts.size : "",
                paid: isLast ? $('#paid').is(':checked') : "",
                totalPrice: isLast ? totalPrice : "",
                partialPayment: isLast ? partialPayment : ""
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


        //Fancy and big font for header
        doc.setFont('Rapunled', 'normal').setFontSize(20);
        let title = "Mrs. Adele Raful Uniform Gemach Order Form"
        let titleWidth = doc.getTextWidth(title);
        doc.text(title, (pageWidth - titleWidth) / 2, 20);

        //Reset font to normal
        doc.setFont('times', 'normal').setFontSize(18);
        let lastname = capitalizeWords(data.lastname);
        let mothersname = capitalizeWords(data.parentname);
        let fullname = `${mothersname} ${lastname}`;
        let nameWidth = doc.getTextWidth(fullname);
        doc.text(fullname, (pageWidth - nameWidth) / 2, 35);


        let y = 55;
        let phonetext = `Phone Number: ${data.phone}`;
        let phoneWidth = doc.getTextWidth(phonetext);

        doc.text(phonetext, (pageWidth - phoneWidth) / 2, y);
        y += 20;

        const col1X = 20;
        const col2X = pageWidth / 2;
        let col1Y = y;
        let col2Y = y;

        // children information
        data.children.forEach((child, index) => {
            let childInfo = [`Child ${index + 1}: ${capitalizeWords(child.childname)}\n\n`];

            if (child.shirts.size && child.shirts.quantity) {
                childInfo += `Shirts: Size ${child.shirts.size} - Quantity: ${child.shirts.quantity}\n\n`
            }
            if (child.skirts.size && child.skirts.quantity) {
                childInfo += `Skirts: Size ${child.skirts.size} - Quantity: ${child.skirts.quantity}\n\n`
            }
            if (child.sweatshirts.size && child.sweatshirts.quantity) {
                childInfo += `Sweatshirts: Size ${child.sweatshirts.size} - Quantity: ${child.sweatshirts.quantity}\n\n`
            }
            if (child.jumpers.size && child.jumpers.quantity) {
                childInfo += `Jumpers: Size ${child.jumpers.size} - Quantity: ${child.jumpers.quantity}\n\n`
            }

            // Check which column to place the next child's info in
            if (index % 2 === 0) {
                // Place in the first column
                doc.text(childInfo, col1X, col1Y);
                col1Y += 60; // Increase the Y position for the next child in column 1
            } else {
                // Place in the second column
                doc.text(childInfo, col2X, col2Y);
                col2Y += 60; // Increase the Y position for the next child in column 2
            }

            //Check if content overflows and need a new page
            if (col1Y > pageHeight - 50 || col2Y > pageHeight - 50) {
                doc.addPage();
                col1Y = 20;
                col2Y = 20;
            }
        });

        // Add payment information
        let paymentY = Math.max(col1Y, col2Y) + 10;
        if (paymentY > pageHeight - 60) {
            doc.addPage();
            paymentY = 30;
        }

        doc.setFontSize(16);
        doc.text(`Total Amount: $${data.totalPrice.toFixed(2)}`, 20, paymentY);

        if (data.partialPayment > 0) {
            paymentY += 10;
            doc.text(`Partial Payment: $${data.partialPayment.toFixed(2)}`, 20, paymentY);
            paymentY += 10;
            const remaining = data.totalPrice - data.partialPayment;
            doc.text(`Remaining Balance: $${remaining.toFixed(2)}`, 20, paymentY);
        }

        doc.setFont('old_stamper', 'normal').setFontSize(60).setTextColor(255, 0, 0);

        let paid = "PAID";
        if (data.paid === true) {
            doc.text(paid, pageWidth / 2, pageHeight - 40, 30, 10);
        } else {
            doc.text(`Not Paid`, pageWidth / 2, pageHeight - 40, 30, 10);
        }

        doc.output('dataurlnewwindow', `${data.parentname} ${data.lastname}`)
    }

    function resetFormFields() {
        $('#ParentName').val('');
        $('#child1').val('');
        $('#lastName').val('');
        $(`#order-title`).text(`Uniform Items`);
        $('select[name="skirtSize"]').val('');
        $('input[name="skirtQuantity1"]').val('');
        $('select[name="shirtSize"]').val('');
        $('input[name="shirtQuantity1"]').val('');
        $('select[name="sweatshirtSize"]').val('');
        $('input[name="sweatshirtQuantity1"]').val('');
        $('select[name="jumperSize"]').val('');
        $('input[name="jumperQuantity1"]').val('');
        $('#phone').val('');
        $('#paid').prop('checked', false);
        $('.extra-child').remove();
        $('#partialPayment').prop("disabled", false).val('');
        $('#total-price').text('');
        childcount = 1;
    }

    function capitalizeWords(str) {
        return str
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
});