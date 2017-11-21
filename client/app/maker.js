const handleDomo = (e) => {
  e.preventDefault();
  
  $("domoMessage").animate({width:'hide'}, 350);
  
  if($("#domoName").val() == '' || $("#domoAge").val() == ''){
    handleError("RAWR! All fields are required!");
    return false;
  }
  
  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function() {
    loadDomosFromServer();
  });
  
  return false;
};

const handleArmy = (e) => {
  e.preventDefault();
  
  $("domoMessage").animate({width:'hide'}, 350);
  
  if($("#listName").val() == '' || $("#listArmy").val() == '' || $("#listPoints").val() == ''){
    handlError("All fields are required!");
    return false;
  }
  
  sendAjax('POST', $("#armyForm").attr("action"), $("#armyForm").serialize(), function() {
    loadArmiesFromServer();
  })
}

const DomoForm = (props) =>{
  return(
    <form id="domoForm"
      onSubmit={handleDomo}
      name="domoForm"
      action="/maker"
      method="POST"
      className="domoForm"
      >
      <label htmlFor="name">Name: </label>
      <input id="domoName" type="text" name="name" placeholder="Domo Name"/>
      <label htmlFor="age">Age: </label>
      <input id="domoAge" type="text" name="age" placeholder="Domo Age"/>
      <label htmlFor="faction">Faction</label>
      <select id="domoFaction" name="faction">
        <option value="imperium" selected>Imperium</option>
        <option value="chaos">Chaos</option>
        <option value="xenos">Xenos</option>
      </select>
      <input type="hidden" name="_csrf" value={props.csrf} />
      <input className="makeDomoSubmit" type="submit" value="Make Domo"/>
    </form>
      
  );
};

const ArmyForm = (props) => {
  return(
    <form id="armyForm"
      onSubmit={handleArmy}
      name="armyForm"
      action="/maker"
      method="POST"
      className="armyForm"
      >
      <label htmlFor="listName">List Name: </label>
      <input id="listName" type="text" name="listName" placeholder="My List"/>
      <label htmlFor="listFaction">Faction: </label>
      <input id="listFaction" type="text" name="listFaction" placeholder="Imperium"/>
      <label htmlFor="listArmy">Army: </label>
      <input id="listArmy" type="text" name="listArmy" placeholder="Imperial Guard"/>
      <label htmlFor="listSubFaction">SubFaction: </label>
      <input id="listSubFaction" type="text" name="listSubFaction" placeholder="Cadian"/>
      <label htmlFor="listPoints">Points: </label>
      <input id="listPoints" type="text" name="listPoints" placeholder="1000"/>
      <label htmlFor="listPower">Power: </label>
      <input id="listPower" type="text" name="listPower" placeholder="58"/>
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="makeArmySubmit" type="submit" value="Make Army"/>
    </form>
      );
};

const ArmyList = function(props) {
  if(props.armies.length === 0){
    return(
      <div className= "armyList">
        <h3 className= "emptyArmy">Make a List!</h3>
      </div>
    );
  }
  
  const armyNodes = props.armies.map(function(army){
    console.dir(army);
    console.log(army.listArmy);

    return(
      <div key={army._id} className="army">
        <h3 className="listName">{army.listName}</h3>
        <h3 className="listFaction">Keyword: {army.listFaction}</h3>
        <h3 className="listArmy">Codex: {army.listArmy}</h3>
        <h3 className="listSubFaction">Doctrines: {army.listSubFaction}</h3>
        <h3 className="listPoints">Points: {army.listPoints}</h3>
        <h3 className="listPower">Power: {army.listPower}</h3>
        <a className="armyId" href={"/delete/"+ army._id}>DELETE ARMY?</a>
        <a className="armyId" href={"/detachment/"+army._id}>ADD DETACHMENT?</a>
      </div>
    );
  });
  
  return(
    <div className="armyList">
      {armyNodes}
    </div>
  );
};

const DomoList = function(props) {
  if(props.domos.length === 0) {
    return (
      <div className = "domoList">
        <h3 className = "emptyDomo">No Domos Yet!</h3>
      </div>
    );
  }
  
  const domoNodes = props.domos.map(function(domo){
    return (
      <div key={domo._id} className="domo">
        <img src="/assets/img/domoFace.jpeg" alt="domo face" className="domoFace"/>
        <h3 className="domoName"> Name: {domo.name} </h3>
        <h3 className="domoAge"> Age: {domo.age} </h3>
        <h3 className="domoFaction">Faction : {domo.faction}</h3>
        <a className="domoId" href={"/delete/" + domo._id} >DELETE ME</a>
      </div>
    );
  });
  
  return(
    <div className = "domoList">
      {domoNodes}
    </div>
  );
};

const loadDomosFromServer = () => {
  sendAjax('GET', '/getDomos', null, (data) =>{
    ReactDOM.render(
      <DomoList domos={data.domos} />,
      document.querySelector('#domos')
    );
  });
};

const loadArmiesFromServer = () =>{
  sendAjax('GET', '/getArmies', null, (data) =>{
    console.log('loading armies from server:');
    console.dir(data.armies);
    ReactDOM.render(
      <ArmyList armies={data.armies}/>,
      document.querySelector("#armies")
    );
  });
};

const setup = function(csrf) {
  ReactDOM.render(
    <ArmyForm csrf={csrf} />, document.querySelector("#makeArmy")
  );
  
  ReactDOM.render(
    <ArmyList armies={[]}/>, document.querySelector('#armies')
  );
  
  loadArmiesFromServer();
};

const getToken = () =>{
  sendAjax('GET', '/getToken', null, (result) =>{
    setup(result.csrfToken);
  });
};

$(document).ready(function(){
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