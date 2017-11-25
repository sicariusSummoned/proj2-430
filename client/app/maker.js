

const handleArmy = (e) => {
  e.preventDefault();
  
  $("domoMessage").animate({width:'hide'}, 350);
  
  if($("#listName").val() == '' || $("#listArmy").val() == '' || $("#listPoints").val() == ''){
    handlError("All fields are required!");
    return false;
  }
  
  sendAjax('POST', $("#armyForm").attr("action"), $("#armyForm").serialize(), function() {
    loadArmiesFromServer();
  });
};

const handleDetachment = (e) =>{
  e.preventDefault();
  
  $("domoMessage").animate({width:'hide'}, 350);
  
  if($("#detachmentType").val() =='' || $("#detachmentPoints").val() ==''){
    handleError("All fields are required!");
    return false;
  }
  
  sendAjax('POST', $("#detachmentForm").attr("action"), $("#detachmentForm").serialize(), function(){
    loadDetachmentsFromServer();
  });
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

const DetachmentForm = (props) =>{
  return(
    <form id="detachmentForm"
      onSubmit={handleDetachment}
      name="detachmentForm"
      action="/detachment"
      method="POST"
      className="detachmentForm"
      >
    <label htmlFor="detachmentType">Detachment Type: </label>
    <input id="detachmentType" type="text" name="detachmentType" placeholder="Patrol"/>
    <label htmlFor="detachmentPoints">Detachment Points: </label>
    <input id="detachmentPoints" type="text" name="detachmentPoints" placeholder="100"/>
    <label htmlFor="detachmentPower">Detachment Power: </label>
    <input id="detachmentPower" type="text" name="detachmentPower" placholder="0"/>
    <input type="hidden" name="_csrf" value={props.csrf}/>
    <input className="makeDetachmentSubmit" type="submit" value="Make Detachment"/>
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

const loadDetachmentsFromServer = () =>{
  sendAjax('GET', '/getDetachments', null,(data) =>{
    console.log('loading detachments from server:');
    console.dir(data.armies);
    ReactDOM.render(
      <DetachmentList detachments={data.detachments}/>,
      document.querySelector("#detachments")
    );
  });
};

const setup = function(csrf) {
  ReactDOM.render(
    <ArmyForm csrf={csrf} />,
    document.querySelector("#makeArmy")
  );
  
  ReactDOM.render(
    <ArmyList armies={[]}/>,
    document.querySelector('#armies')
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
