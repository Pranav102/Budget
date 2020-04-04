var BudgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

})();
var UIController = (function() {
  var DOMstrings = {
    inputtype: '.add__type',
    inputdescription: '.add__description',
    inputvalue: '.add__value',
    inputbtn: '.add__btn'
  };

  return {
    testUIController: function() {
      return {
        type: document.querySelector(DOMstrings.inputtype).value,
        description: document.querySelector(DOMstrings.inputdescription).value,
        value: document.querySelector(DOMstrings.inputvalue).value
      };
    },
    getDOMstring: function() {
      return DOMstrings;
    }
  };
})();
var Controller = (function(budgctrl, uictrl) {

  var setEventListener = function() {
    var DOM = uictrl.getDOMstring();
    document.querySelector(DOM.inputbtn).addEventListener('click', ctrlAddition);
    document.addEventListener('keypress', function(event) {
      if (event.keycode === 13 || event.which === 13) {
        ctrlAddition();
      }
    });
  };

  var ctrlAddition = function() {
    //1.take input from user
    var ui = uictrl.testUIController();
    console.log(ui);

    //2.add the item to budget Controller

    //3. Add the item yo UI

    //4.Calculate the budget

    //5.Display the budgeton the UI
  };
  return {
    init: function() {
      console.log("Hello");
      setEventListener();
    }
  }

})(BudgetController, UIController);
Controller.init();
