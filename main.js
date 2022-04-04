
window.onload = () => {

    // SELECTION PART
    const layout = document.querySelector('.center_div'),
          menu_btn = document.querySelector('.menu_btn'),
          bgColors = document.querySelector('.bgColors'),
          colors = document.querySelectorAll('.color');

    menu_btn.addEventListener('click',function(){

        bgColors.classList.toggle('show')

    })

    // CHANGE CALCULATOR BACKGROUND COLOR

    if(bgColors){
        colors.forEach(item =>{
            
            item.addEventListener('click',()=>{
                
                changeColor(item)
                bgColors.classList.toggle('show')
            })
        })
    }

    // CHANGE COLOR FUNCTION
    function changeColor(item){
        if(item.classList.contains('blue')){

            layout.classList = "center_div bg-blue"

        }else if(item.classList.contains('white')){

            layout.classList = "center_div bg-white"

        }else{

            layout.classList = "center_div bg-light-blue"

        }
    }


    // WORKING ON INPUT OR CALCULATION AREA
}