"use strict";

var handleDomo = function handleDomo(e) {
  e.preventDefault();

  $("domoMessage").animate({ width: 'hide' }, 350);

  if ($("#domoName").val() == '' || $("#domoAge").val() == '') {
    handleError("RAWR! All fields are required!");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer();
  });

  return false;
};

var handleArmy = function handleArmy(e) {
  e.preventDefault();

  $("domoMessage").animate({ width: 'hide' }, 350);

  if ($("#listName").val() == '' || $("#listArmy").val() == '' || $("#listPoints").val() == '') {
    handlError("All fields are required!");
    return false;
  }

  sendAjax('POST', $("#armyForm").attr("action"), $("#armyForm").serialize(), function () {
    loadArmiesFromServer();
  });
};

var DomoForm = function DomoForm(props) {
  return React.createElement(
    "form",
    { id: "domoForm",
      onSubmit: handleDomo,
      name: "domoForm",
      action: "/maker",
      method: "POST",
      className: "domoForm"
    },
    React.createElement(
      "label",
      { htmlFor: "name" },
      "Name: "
    ),
    React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Domo Name" }),
    React.createElement(
      "label",
      { htmlFor: "age" },
      "Age: "
    ),
    React.createElement("input", { id: "domoAge", type: "text", name: "age", placeholder: "Domo Age" }),
    React.createElement(
      "label",
      { htmlFor: "faction" },
      "Faction"
    ),
    React.createElement(
      "select",
      { id: "domoFaction", name: "faction" },
      React.createElement(
        "option",
        { value: "imperium", selected: true },
        "Imperium"
      ),
      React.createElement(
        "option",
        { value: "chaos" },
        "Chaos"
      ),
      React.createElement(
        "option",
        { value: "xenos" },
        "Xenos"
      )
    ),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Make Domo" })
  );
};

var ArmyForm = function ArmyForm(props) {
  return React.createElement(
    "form",
    { id: "armyForm",
      onSubmit: handleArmy,
      name: "armyForm",
      action: "/maker",
      method: "POST",
      className: "armyForm"
    },
    React.createElement(
      "label",
      { htmlFor: "listName" },
      "List Name: "
    ),
    React.createElement("input", { id: "listName", type: "text", name: "listName", placeholder: "My List" }),
    React.createElement(
      "label",
      { htmlFor: "listFaction" },
      "Faction: "
    ),
    React.createElement("input", { id: "listFaction", type: "text", name: "listFaction", placeholder: "Imperium" }),
    React.createElement(
      "label",
      { htmlFor: "listArmy" },
      "Army: "
    ),
    React.createElement("input", { id: "listArmy", type: "text", name: "listArmy", placeholder: "Imperial Guard" }),
    React.createElement(
      "label",
      { htmlFor: "listSubFaction" },
      "SubFaction: "
    ),
    React.createElement("input", { id: "listSubFaction", type: "text", name: "listSubFaction", placeholder: "Cadian" }),
    React.createElement(
      "label",
      { htmlFor: "listPoints" },
      "Points: "
    ),
    React.createElement("input", { id: "listPoints", type: "text", name: "listPoints", placeholder: "1000" }),
    React.createElement(
      "label",
      { htmlFor: "listPower" },
      "Power: "
    ),
    React.createElement("input", { id: "listPower", type: "text", name: "listPower", placeholder: "58" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "makeArmySubmit", type: "submit", value: "Make Army" })
  );
};

var ArmyList = function ArmyList(props) {
  if (props.armies.length === 0) {
    return React.createElement(
      "div",
      { className: "armyList" },
      React.createElement(
        "h3",
        { className: "emptyArmy" },
        "Make a List!"
      )
    );
  }

  var armyNodes = props.armies.map(function (army) {
    console.dir(army);
    console.log(army.listArmy);

    return React.createElement(
      "div",
      { key: army._id, className: "army" },
      React.createElement(
        "h3",
        { className: "listName" },
        army.listName
      ),
      React.createElement(
        "h3",
        { className: "listFaction" },
        "Keyword: ",
        army.listFaction
      ),
      React.createElement(
        "h3",
        { className: "listArmy" },
        "Codex: ",
        army.listArmy
      ),
      React.createElement(
        "h3",
        { className: "listSubFaction" },
        "Doctrines: ",
        army.listSubFaction
      ),
      React.createElement(
        "h3",
        { className: "listPoints" },
        "Points: ",
        army.listPoints
      ),
      React.createElement(
        "h3",
        { className: "listPower" },
        "Power: ",
        army.listPower
      ),
      React.createElement(
        "a",
        { className: "armyId", href: "/delete/" + army._id },
        "DELETE ARMY?"
      ),
      React.createElement(
        "a",
        { className: "armyId", href: "/detachment/" + army._id },
        "ADD DETACHMENT?"
      )
    );
  });

  return React.createElement(
    "div",
    { className: "armyList" },
    armyNodes
  );
};

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return React.createElement(
      "div",
      { className: "domoList" },
      React.createElement(
        "h3",
        { className: "emptyDomo" },
        "No Domos Yet!"
      )
    );
  }

  var domoNodes = props.domos.map(function (domo) {
    return React.createElement(
      "div",
      { key: domo._id, className: "domo" },
      React.createElement("img", { src: "/assets/img/domoFace.jpeg", alt: "domo face", className: "domoFace" }),
      React.createElement(
        "h3",
        { className: "domoName" },
        " Name: ",
        domo.name,
        " "
      ),
      React.createElement(
        "h3",
        { className: "domoAge" },
        " Age: ",
        domo.age,
        " "
      ),
      React.createElement(
        "h3",
        { className: "domoFaction" },
        "Faction : ",
        domo.faction
      ),
      React.createElement(
        "a",
        { className: "domoId", href: "/delete/" + domo._id },
        "DELETE ME"
      )
    );
  });

  return React.createElement(
    "div",
    { className: "domoList" },
    domoNodes
  );
};

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector('#domos'));
  });
};

var loadArmiesFromServer = function loadArmiesFromServer() {
  sendAjax('GET', '/getArmies', null, function (data) {
    console.log('loading armies from server:');
    console.dir(data.armies);
    ReactDOM.render(React.createElement(ArmyList, { armies: data.armies }), document.querySelector("#armies"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(ArmyForm, { csrf: csrf }), document.querySelector("#makeArmy"));

  ReactDOM.render(React.createElement(ArmyList, { armies: [] }), document.querySelector('#armies'));

  loadArmiesFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});

/**
const DemoForm = (props) =>{
  
  // Determine if condition is true or false
  const isSelected = true;
  return(
    <div>
      {
        isSelected &&
          <p>It is selected!</p>
      }
      {
        !isSelected &&
          <p>It not selected :(</p>
      }
    </div>
  );
};

class thing extends React.Component() {
  constructor(props) {
    super(props);
    
    this.state = {
      thing1: 'a',
      thing2: 'b',
    }
  }
  
  render() {
    return (
    );
  }
}
**/
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
