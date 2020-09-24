
console.log("hi");





let url = "http://localhost:3004/api/coupon";
let data = {
    "CouponCode": "AeeUUue",
    "discountAmount": 100,
    "type": "flat",
    "minAmount": 100,
    "startDate": "2020-09-21",
    "endDate": "2020-09-25",
    "maxDiscount": 90
}
async function sampleFunction() {
    let option = {
        autohide: true,
        delay: 1000
    }
    let modalOpt = {
        keyboard: true
    }
    $('.toast').toast(option)
    getAllCoupon()

}

function createCoupon(event) {
    const form = new FormData(event.target);
    data["CouponCode"] = form.get("coupon");
    data["type"] = form.get("type");
    data["discountAmount"] = form.get("amount");
    data["minAmount"] = form.get("cart");
    data["startDate"] = form.get("start");
    data["endDate"] = form.get("end");
    data["maxDiscount"] = form.get("max-disc");



    console.log(data);
    postData(url, data)
        .then(data => {
            if (data.success) {
                showToast("Coupon created successfully!!")
            } else {
                showToast(data.error)
            }
            console.log(data); // JSON data parsed by `data.json()` call

        });
    event.preventDefault()
}

function applyCoupon(params) {
    let data = {}
    const form = new FormData(params.target);
    data["coupon"] = form.get("coupon-id");
    data["amount"] = form.get("cart");
    fetch(url + "/apply?coupon=" + data["coupon"] + "&amount=" + data["amount"])
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.success) {
                $("#modal-body").html(`${data.payload.amountToDeduct} rupees can be deducted from the cart price`);
                $('.myModal').modal('show')
            } else {
                $("#modal-body").html(`${data.error}`);
                $('.myModal').modal('show')
            }
        });
    params.preventDefault()
}

function showToast(data) {
    $("#toast").html(data)
    $('.toast').toast('show')
}

async function getAllCoupon(params) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.length>0) {
                for (let i = 0; i < data.length; i++) {
                    tr = $('<tr/>')
                    tr.append("<td>" + (i+1) + "</td>");
                    tr.append("<td>" + data[i]["CouponCode"] + "</td>");
                    tr.append("<td>" + data[i]["startDate"] + "</td>");
                    tr.append("<td>" + data[i]["endDate"] + "</td>");

                    $('#table_1').append(tr);
                }
            } else {
                $("#modal-body").html(`${data.error}`);
                $('.myModal').modal('show')
            }
        });
}


// Example POST method implementation: refered from MDN website
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

