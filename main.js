
window.onload = () => {

    // ================= SELECT DOM ELEMENTS ================= //

    const layout = document.querySelector('.center_div'),
          menu_btn = document.querySelector('.menu_btn'),
          bgColors = document.querySelector('.bgColors'),
          colors = document.querySelectorAll('.color');

    menu_btn.addEventListener('click',function(){

        bgColors.classList.toggle('show')

    })

    // ================= CHANGE CALCULATOR BACKGROUND COLOR ================= //

    if(bgColors){
        colors.forEach(item =>{
            
            item.addEventListener('click',()=>{
                
                changeColor(item)
                bgColors.classList.toggle('show')
            })
        })
    }

    // ================= CHANGE CALCULATOR BACKGROUND COLOR FUNCTION ================= //

    function changeColor(item){
        if(item.classList.contains('blue')){

            layout.classList = "center_div bg-blue"

        }else if(item.classList.contains('white')){

            layout.classList = "center_div bg-white"

        }else{

            layout.classList = "center_div bg-light-blue"

        }
    }

    // ================= SELECT DOM ELEMENTS FOR FORM/CALCULATION ================= //

    const inp_btn = document.querySelector('.input_btn'),
          btns = document.querySelectorAll('.input_btn button'),
          input = document.getElementById('input_field'),
          recent = document.getElementById('result'),
          reset = document.querySelector('.reset')

    

    // ================= SET FORM OPEARTION ================= //

    inp_btn.addEventListener('submit',function(e){
        e.preventDefault();
    })

    btns.forEach(btn => {
        btn.addEventListener('click',function(){
            setField(btn.value)
        })
    })

    // ================= REACTION ON WHENT BUTTONS ARE CLICK ================= //

    let dot = 0
    let zeroIn = false
    function setField(value){
        if(value === 'ac'){
            input.value = '0'
            dot = 0
            zeroIn = false
        }else if(value === 'clear'){
            clearLast(input.value)
            zeroIn = false
        }else if(checkParamiter(value)){
            dot = 0
            if(zeroIn){
                input.value = 0;
                zeroIn = false
            }
            setOperation(value)
        }else if( value === '='){
            dot = 0
            setResult(input.value)
        }else{
            if(zeroIn){
                input.value = 0;
                zeroIn = false
            }
            setNumber(value)
        }
    }


    // ================= FUNCTION FOR DELETE LAST ELEMENT  =================//

    function clearLast(value){
        
        let val = ''
        if(value.charAt(value.length -1) === ' '){
            val = value.slice(0,-3)
        }else{
            val = value.slice(0,-1)
        }
        input.value = val
        if(input.value === ''){
            input.value = '0'
        }
    }


    // ================= FUNCTION FOR OPEARTORS MOVEMENT ================= //

    function setOperation(value){
        
        if(input.value.charAt(input.value.length-1) === '.'){
            input.value += '0'
        }
        let val = input.value
        let len = val.length - 2
        
        if(checkParamiter(val.charAt(len))){
            val = val.slice(0,-2)
            input.value = ' '+ val + value + ' '
        }else{
            input.value += ' ' + value + ' '
        }
        if(value === '%'){
            let percent = percentage()
            input.value = percent.join(' ')
        }
    }


    // ================= FUNCITION FOR NUMBERS ================= //

    function setNumber(value){
        let len = input.value.length - 1
        if(value === '.'){
            dot++
        }
        if(value === '.' && dot > 1){
            value = ''
        }
        if(input.value === '0'){
            if(value === '.'){
                input.value += value
            }else{
                input.value = value
            }
        }else{
            input.value += value
        }
    }


    // ================= FUNCTION FOR REGULER CHECKING ================= //

    function checkParamiter(value){
        if(value === '%' || value === '/' || value === '*' || value === '-'|| value === '+' ){
            return true
        }
        return false
    }


    // ================= FUNCTION FOR GET PERCENTAGE ================= //

    function percentage(){
        let arr = input.value.split(' ')
        let index = arr.length
        let perse = 0
        if(index === 3){
            perse = Number.parseFloat(arr[0]) / 100
        }else{
            perse = (Number.parseFloat(arr[index-5]) * Number.parseFloat(arr[index - 3])) / 100
        }
        arr.pop()
        arr.pop()
        arr.pop()
        arr.push(perse.toString())
        return arr
    }


    // ================= FUNCTION FOR SET RESULT ================= //

    function setResult(value){
        let len = (value.split(/[+-/*]/)).length
        let newVal = 0;
        if(len > 1){
            if(checkParamiter(value.charAt(value.length-2))){
                value = value.slice(0,-3)
            }
            
            newVal = Number.parseFloat(eval(value))
            if(newVal % 1 === 0){
                newVal = Number.parseInt(newVal)
            }else{
                newVal = newVal.toFixed(2)
            }
            input.value = newVal.toString()
            recent.innerHTML += `${value} = <br> ${newVal} <br>`
            reset.classList.add('active')
            zeroIn = true
        }
        
    }


    // ================= RESET INPUT FIELD ================= //

    if(reset){
        reset.addEventListener('click',function(){
            recent.innerHTML = ''
            this.classList.remove('active')
        })
    }


}