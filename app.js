  

  //BudegetController module
  var BudgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage=-1;
  };
  Expense.prototype.calculatepercentage=function(totalincome){
    if(totalincome >0){

      this.percentage=Math.round((this.value/totalincome)*100);
    }else{
      this.percentage=-1;
    }
  };

  Expense.prototype.getpercentage=function(){
      return this.percentage;
  };





  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };


  
  var incexp = function(type){
    var sum=0;
    data.allitems[type].forEach(function(cur) {
        sum=sum+cur.value;
    });
    //storing the total in totals object
    data.totals[type]=sum;
  };



  
  var data = {
    allitems: { //allitemsexpense=[]
      inc: [], //allitemsincome=[]
      exp: []
    },
    totals: {
      inc : 0,
      exp : 0
    },
    budget:0,
    percentage:-1

  };

  

  return {
    newitem: function(type, desc, value) {
      var choice, ID;
      ID = 0;
      //create  Id
      if(data.allitems[type][data.allitems.length]>0){
        ID = data.allitems[type][data.allitems.length-1].id+1;
      }else{
        ID=0;
      }
      if (type === 'exp') {
        //creating an object based on exp or inc
        choice = new Expense(ID, desc, value);
      } else if (type === 'inc') {
        choice = new Income(ID, desc, value);
      }
      //pushing the object created above in our data structure
      data.allitems[type].push(choice);

      //return the new value
      return choice;
    },



    deleteitem:function(type,id){
      var ids,index;
      //id=6
      //data.allitems[type][id];
      //ids=[1 2 4 6 7]
      //index = 3

      //map loop through the array :it always return something then we have to store the return value in a variable as done below
      console.log(data.allitems, type)
      ids = data.allitems[type].map(function(current){
            return current.id;
      });
      index=ids.indexOf(id);

      //splice function:it accepts two arguments as parameters one is index and other is id    
      if(index !==-1){
         data.allitems[type].splice(index,1);
      }
    },





    calculateBudget:function(){
       //calculate total income and expenses
      incexp('inc');
      incexp('exp');
      //calculate the budget income and expenses
      data.budget=data.totals.inc-data.totals.exp;
      //calculate the percentage of income that we spent
      if(data.totals.inc>0){
          data.percentage=Math.round((data.totals.exp/data.totals.inc)*100);
      }else{
        data.percentage=-1;
      }
    },



    calcpercentage:function(){

        data.allitems.exp.forEach(function(cur){
            cur.calculatepercentage(data.totals.inc);
        });
    },



    Getpercentage:function(){
        var allPerc=data.allitems.exp.map(function(cur){
          return cur.getpercentage();
        });
        return allPerc;
    },

   


    getbudget: function(){
      return{
        budtotal: data.budget,
        totalinc: data.totals.inc,
        totalexp: data.totals.exp,
        percentage: data.percentage
      };
    }


}})();




















//UI Controller
var UIController = (function() {
  var DOMstrings = {
    inputtype: '.add__type',
    inputdescription: '.add__description',
    inputvalue: '.add__value',
    inputbtn: '.add__btn',
    inputexp:'.expenses__list',
    inputinc:'.income__list',
    budgetlable:'.budget__value',
    incomelable:'.budget__income--value',
    expenselable:'.budget__expenses--value',
    percentage:'.budget__expenses--percentage',
    container: '.container',
    expensesPercLable:'.item__percentage',
    datelable:'.budget__title--month'
  };




    formatNumber=function(num,type){
      var numsplit,int,dec;
      // + or - before the Number
      // exactly two decimal points
      // comma separating thousand

      // 2314.567---> +2,314.56
      // 2000----> +2000
      num=Math.abs(num);  //here num is being overrided since the passed argument and the storing argument both are same..
                           //also the abs stands for absolute method:it simply removes the sign of the number.

      num=num.toFixed(2); //twoFixed is not a Math function rather it is the function of int and thus we call it num.toFixed instead of Math.toFixed..
                          //what it does is it adds the zeros eg-2000---->2000.00   20134.5743894----->20134.57 
                          //now from this point we have int converted to string becoz of toFixed function

      //code for adding comma
      numsplit=num.split('.');  //split divides the string into two since decimal is being passed as an argument thus number will be divided as show below
                                //20134.3456---->[20134,3456] like this...
      int =numsplit[0];
      if(int.length>3){
          int=int.substr(0,int.length-3)  +','+ int.substr(int.length-3,int.length);// 23345---->23,345
      }
      dec=numsplit[1];

      return (type==='exp'? '-'  : '+')+ ' '+int+'.'+dec;

                                                  
    };



    var nodeListForEach=function(list,callback){
              for(var i=0;i<list.length;i++){
                    callback(list[i],i);
              }
        };
    


  return {
    testUIController: function() {
      return {
        type: document.querySelector(DOMstrings.inputtype).value,
        description: document.querySelector(DOMstrings.inputdescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputvalue).value)
      };
    },
    


    addListitem:function(obj,type){
      var html,newhtml,element;
      //create a html string with a place holder text
      if(type==='inc'){
        element=DOMstrings.inputinc;
      html='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    }if(type==='exp'){
        element=DOMstrings.inputexp;
      html='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //repalce the html tag with actual data
      newhtml=html.replace('%id%',obj.id);
      newhtml=newhtml.replace('%description%',obj.description);
      newhtml=newhtml.replace('%value%',formatNumber(obj.value,type));

      //Insert the html into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);
    },



    deleteListItem:function(selectorID){
      var el= document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },



    
    clearfields:function(){
      var all,allarray;
      all=document.querySelectorAll(DOMstrings.inputdescription +','+DOMstrings.inputvalue);
      allarray=Array.prototype.slice.call(all);
      allarray.forEach(function(current,index,value) {
        current.value="";
      });
      allarray[0].focus();
    },



      displayBudget:function(obj){
        var type;
        obj.budtotal >0 ? type='inc' :type='exp';
      document.querySelector(DOMstrings.budgetlable).textContent=formatNumber(obj.budtotal,type);
      document.querySelector(DOMstrings.incomelable).textContent=formatNumber(obj.totalinc,'inc');
      document.querySelector(DOMstrings.expenselable).textContent=formatNumber(obj.totalexp,'exp');
      if(obj.percentage>0){
       document.querySelector(DOMstrings.percentage).textContent=obj.percentage +'%';
      }else{
              document.querySelector(DOMstrings.percentage).textContent='---';
            }
    },



    displayPercentages:function(percentages){
        //nodelist does not have the for each method thus we do as shown below to crete our own for each method
        //if still not understood watch part 4 time 25:26 of the vedio
        var fields=document.querySelectorAll(DOMstrings.expensesPercLable)
        
        nodeListForEach(fields,function(current,index){
          if(percentages[index]>0){
            current.textContent=percentages[index]+'%';
          }else{
            current.textContent='-----';
          }
        }); 
    },



    displayMonth:function(){
        var date,month,year,months;
        date = new Date();

        months=['jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
        month=date.getMonth();
        year=date.getFullYear();

        document.querySelector(DOMstrings.datelable).textContent=months[month]  +' '+year; 
    },



    colorchangedtype:function(){
        var fields=document.querySelectorAll(DOMstrings.inputtype+','+DOMstrings.inputdescription+','+DOMstrings.inputvalue);

        nodeListForEach(fields, function(cur){
          cur.classList.toggle('red-focus');
        });
        document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
      },


    getDOMstring: function(obj,type) {
      return DOMstrings;
    }
  };
})();


















//Controller module
var Controller = (function(budgctrl, uictrl) {

  var setEventListener = function() {
    var DOM = uictrl.getDOMstring();
    document.querySelector(DOM.inputbtn).addEventListener('click', ctrlAddition);
    document.addEventListener('keypress', function(event) {
      if (event.keycode === 13 || event.which === 13) {
        ctrlAddition();
      }
    });
    
    document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
    document.querySelector(DOM.inputtype).addEventListener('change',uictrl.colorchangedtype);

  };




  var updatebudget=function(){
  //5.Calculate the budget
  budgctrl.calculateBudget();

  //return the budget`
  var totalbudget=budgctrl.getbudget();

  //6.Display the budgeton the UI
  uictrl.displayBudget(totalbudget);
};


  
var updatepercentages=function(){
    //1.calculate percentages
      budgctrl.calcpercentage();

    //2.get percentages from budgetcontroller
     var percentages=budgctrl.Getpercentage();

    //3.Update the ui with the new percentages
    uictrl.displayPercentages(percentages);
};



  

  var ctrlAddition = function() {
    //1.take input from user
    var ui = uictrl.testUIController();

    if(ui.description !=="" && ui.value>0 && !isNaN(ui.value))
    //2.add the item to budget Controller
    var item = budgctrl.newitem(ui.type,ui.description,ui.value);

    //3. Add the item to UI
    uictrl.addListitem(item,ui.type);

    //4.Clear fields
    uictrl.clearfields();

    //5.Update budget
    updatebudget();

    //6.calculate and update percentage
    updatepercentages();

  };



  var ctrlDeleteItem=function(event){
      var itemID, splitID,type,id;
      itemID=(event.target.parentNode.parentNode.parentNode.parentNode.id);
      if(itemID){
      //inc-1
      splitID=itemID.split('-');
      type=splitID[0];

      smallType = type.substring(0, 3);

      console.log(smallType, splitID);
      id=parseInt(splitID[1]);

      //1.delete the item from the data structure
      budgctrl.deleteitem(smallType,id);
      
      //2.Delete the item from ui

      uictrl.deleteListItem(itemID);
      
      //3.Update and show the new budget
      updatebudget();

      //4.call updatepercentages function
      updatepercentages();
      }
  };




  

  return {
    init: function() {
      console.log(' hello there');
      uictrl.displayMonth();
      uictrl.displayBudget({
        budtotal: 0,
        totalinc: 0,
        totalexp: 0,  
        percentage:-1});
        
      
      setEventListener();
    }
  }

})(BudgetController, UIController);
Controller.init();
