
    var charges = 0.04;
    var rate = 0.20;
    var days = 60;
    var vat = 13.50;
    var units = 225;

    var first = rate + days * charges;

    function calculateBill(units) {

        if (units = 225){

            return first + first * vat / 100;
        }
        else{
            return 0;
        }
    }

    document.write(calculateBill(units));