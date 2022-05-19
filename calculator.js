
    function calculateBill() {

    var charges = 0.04;
    var rate = 0.20;
    var vat = 13.50;

    var inputUnit = document.getElementById('number');
    var inputDays = document.getElementById('period'); 

    var billClean = inputUnit * rate + inputDays * charges;

        if (inputUnit == 225 && inputDays == 60){

         return  billClean + billClean * vat / 100;

        }
       
        else{
            return "Plese check your input and try again";
        }
    }