

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
  console.dir($("#detachmentForm").attr("action"));
  
  sendAjax('POST', $("#detachmentForm").attr("action"), $("#detachmentForm").serialize(), function(){
    
    loadDetachmentsFromServer();
  });
};

const handleUnit = (e) =>{
  e.preventDefault();
  
  $("domoMessage").animate({width:'hide'},350);
  
  if($("unitName").val() == '' || $("#unitType").val() == '' || $("#unitPoints").val() == ''){
    handleError("All fields are required!");
    return false;
  }
  
  sendAjax('POST', $("#unitForm").attr("action"), $("unitForm").serialize(),function() {
    loadUnitsFromServer();
  });
};

const handleModel = (e) =>{
  e.preventDefault();
  
  $("domoMessage").animate({width:'hide'},350);
  
  if($("modelName").val() == '' || $("#modelPoints").val() == '' || $("#modelQuantity").val() == ''){
    handleError("All fields are required!");
    return false;
  }
  
  sendAjax('POST', $("#modelForm").attr("action"), $("modelForm").serialize(),function() {
    loadModelsFromServer();
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
  const ownerString = window.location.pathname.split('/')[2];
  console.log(ownerString);
  return(
    <form id="detachmentForm"
      onSubmit={handleDetachment}
      name="detachmentForm"
      action={"/detachments/"+ ownerString}
      method="POST"
      className="detachmentForm"
      >
      <label htmlFor="detachmentType">Detachment Type: </label>
      <input id="detachmentType" type="text" name="detachmentType" placeholder="Patrol"/>
      <label htmlFor="detachmentPoints">Detachment Points: </label>
      <input id="detachmentPoints" type="text" name="detachmentPoints" placeholder="100"/>
      <label htmlFor="detachmentPower">Detachment Power: </label>
      <input id="detachmentPower" type="text" name="detachmentPower" placeholder="0"/>
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="makeDetachmentSubmit" type="submit" value="Make Detachment"/>
    </form>
  );
};

const UnitForm = (props) =>{
  const ownerString = window.location.pathname.split('/')[2];
  console.log(ownerString);
  return(
    <form id="unitForm"
      onSubmit={handleUnit}
      name="unitForm"
      action={"/units/"+ownerString}
      method="POST"
      className="unitForm"
      >
      <label htmlFor="unitName">Unit Name: </label>
      <input id="unitName" type="text" name="unitName" placeholder="Infantry Squad"/>
      <label htmlFor="unitType">Unit Type: </label>
      <input id="unitType" type="text" name="unitType" placeholder="Infantry"/>
      <label htmlFor="unitPoints">Unit Points: </label>
      <input id="unitPoints" type="text" name="unitPoints" placeholder="100"/>
      <label htmlFor="unitPower">Unit Power: </label>
      <input id="unitPower" type="text" name="unitPower" placeholder="3"/>
      <label htmlFor="unitUpgrades">Unit Upgrades: </label>
      <input id="unitUpgrades" type="text" name="unitUpgrades" placeholder="none"/>
      <label htmlFor="unitUpgradesCost">Upgrade Costs: </label>
      <input id="unitUpgradesCost" type="text" name="unitUpgradesCost" placeholder="0"/>
      <label htmlFor="unitSpecialRules">Special Rules: </label>
      <input id="unitSpecialRules" type="text" name="unitSpecialRules" placeholder="Infantry"/>
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="makeUnitSubmit" type="submit" value="Make Unit"/>
    </form>
  );
};

const ModelForm = (props) =>{
  const ownerString = window.location.pathname.split('/')[2];
  console.log(ownerString);
  return(
    <form id="modelForm"
      onSubmit={handleModel}
      name="modelForm"
      action={"/models/"+ownerString}
      method="POST"
      className="modelForm"
      >
      <label htmlFor="modelName">Model Name: </label>
      <input id="modelName" type="text" name="modelName" placeholder="Guardsman"/>
      <label htmlFor="modelStats">Model Stats: </label>
      <input id="modelStats" type="text" name="modelStats" placeholder="Bs4+ Ws4+ W1 S3 T3 Ld7 Sv5+"/>
      <label htmlFor="modelPoints">Model Points: </label>
      <input id="modelPoints" type="text" name="modelPoints" placeholder="0"/>
      <label htmlFor="modelQuantity">Model Quantity: </label>
      <input id="modelQuantity" type="text" name="modelQuantity" placeholder="9"/>
      <label htmlFor="modelupgrades">Model Upgrades: </label>
      <input id="modelUpgrades" type="text" name="modelUpgrades" placeholder="Lasgun CCW Frags"/>
      <label htmlFor="modelUpgradesCost">Upgrade Costs: </label>
      <input id="modelUpgradesCost" type="text" name="modelUpgradesCost" placeholder="0"/>
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="makeModelSubmit" type="submit" value=" Make Model"/>
    </form>
  );
};

const ArmyList = function(props) {
  if(props.armies.length === 0) {
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
        <a className="armyId" href={"/detachments/"+ army._id}>ADD DETACHMENT?</a>
      </div>
    );
  });
  
  return(
    <div className="armyList">
      {armyNodes}
    </div>
  );
};

const DetachmentList = function(props) {
  if(props.detachments.length === 0) {
    return(
    <div className= "detachmentList">
      <h3 className= "emptyDetachment">Add a Detachment!</h3>
    </div>
    );
  }
  
  const detachmentNodes = props.detachments.map(function(detachment){
    console.dir(detachment);
    
    const ownerString = window.location.pathname.split('/')[2];
    console.log(ownerString);
    
    return(
      <div key={detachment._id} className="detachment">
        <h3 className="detachmentType">Type: {detachment.detachmentType}</h3>
        <h3 className="detachmentPoints">Points: {detachment.detachmentPoints}</h3>
        <h3 className="detachmentPower">Power: {detachment.detachmentPower}</h3>
        <a className="detachmentId" href={"/deleteDetachment/"+detachment._id +'/'+ownerString}>DELETE DETACHMENT?</a>
        <a className="detachmentId" href={"/units/"+detachment._id}>ADD UNIT?</a>
      </div>
    );
  });
  return(
    <div className="detachmentList">
      {detachmentNodes}
    </div>
  );
};

const UnitList = function(props) {
  if(props.units.length === 0) {
    return(
      <div className = "unitList">
        <h3 className= "emptyUnit">Add a Unit!</h3>
      </div>
    );
  }
  
  const unitNodes = props.units.map(function(unit){
    console.dir(unit);
    
    const ownerString = window.location.pathname.split('/')[2];
    console.log(ownerString);
    
    return(
      <div key={unit._id} className="unit">
        <h3 className="unitName">{unit.unitName}</h3>
        <h3 className="unitType">Type: {unit.unitType}</h3>
        <h3 className="unitPoints">Points: {unit.unitPoints}</h3>
        <h3 className="unitPower">Power: {unit.unitPower}</h3>
        <h3 className="unitUpgrades">Upgrades: {unit.unitUpgrades}</h3>
        <h3 className="unitUpgradesCost">Upgrades Cost: {unit.unitUpgradesCost}</h3>
        <h3 className="unitSpecialRules">Special Rules: {unit.unitSpecialRules}</h3>
        <a className="unitId" href={"/deleteUnit/"+unit._id +'/'+ownerString}>DELETE DETACHMENT?</a>
        <a className="unitId" href={"/models/"+unit._id}>ADD MODEL?</a>
      </div>
    );
  });
  return(
    <div className="unitList">
      {unitNodes}
    </div>
  );
};

const ModelList = function(props) {
  if(props.models.length === 0) {
    return(
      <div className= "modelList">
        <h3 className = "emptyModel">Add a Model!</h3>
      </div>
    );
  }
  
  const modelNodes = props.models.map(function(model){
    console.dir(model);
    
    const ownerString = window.location.pathname.split('/')[2];
    console.log(ownerString);
    
    return(
      <div key={model._id} className="model">
        <h3 className="modelName">{model.modelGnome}</h3>
        <h3 className="modelStats">Stats: {model.modelStats}</h3>
        <h3 className="modelPoints">Points: {model.modelPoints}</h3>
        <h3 className="modelQuantity">#: {model.modelQuantity}</h3>
        <h3 className="modelUpgrades">Upgrades: {model.modelUpgrades}</h3>
        <h3 className="modelUpgradesCost">Upgrades Cost: {model.modelUpgradesCost}</h3>
        <a className="modelId" href={"/deleteModel/"+model._id +'/'+ownerString}>DELETE MODEL?</a>
      </div>
    );
  });
  return(
    <div className="modelList">
      {modelNodes}
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
  const ownerString = window.location.pathname.split('/')[2];
  console.log(ownerString);
  const fullString = '/getDetachments/'+ownerString;
  
  sendAjax('GET', fullString, null,(data) =>{
    console.log('loading detachments from server:');
    console.dir(data.detachments);
    ReactDOM.render(
      <DetachmentList detachments={data.detachments}/>,
      document.querySelector("#armies")
    );
  });
};

const loadUnitsFromServer = () => {
  const ownerString = window.location.pathname.split('/')[2];
  console.log(ownerString);
  const fullString = '/getUnits/'+ownerString;
  
  sendAjax('GET', fullString, null,(data) =>{
    console.log('loading units from server:');
    console.dir(data.units);
    ReactDOM.render(
      <UnitList units={data.units}/>,
      document.querySelector("#armies")
    );
  });
};

const loadModelsFromServer = () => {
  const ownerString = window.location.pathname.split('/')[2];
  console.log(ownerString);
  const fullString = '/getModels/'+ownerString;
  
  sendAjax('GET', fullString, null,(data) =>{
    console.log('loading models from server:');
    console.dir(data.models);
    ReactDOM.render(
      <ModelList models={data.models}/>,
      document.querySelector("#armies")
    );
  });
};

const setup = function(csrf) {
  switch(page){
    case 'detachments':
      ReactDOM.render(
        <DetachmentForm csrf={csrf} />,
        document.querySelector("#makeArmy")
      );
      ReactDOM.render(
        <DetachmentList detachments={[]}/>,
        document.querySelector('#armies')
      );
      loadDetachmentsFromServer();
      break;
    case 'units':
      ReactDOM.render(
        <UnitForm csrf={csrf} />,
        document.querySelector("#makeArmy")
      );
      ReactDOM.render(
        <UnitList units={[]}/>,
        document.querySelector("#armies")
      );
      loadUnitsFromServer();
      break;
    case 'models':
      ReactDOM.render(
        <ModelForm csrf={csrf} />,
        document.querySelector("#makeArmy")
      );
      ReactDOM.render(
        <ModelList models={[]}/>,
        document.querySelector("#armies")
      );
      loadModelsFromServer();
      break;
    default:
      ReactDOM.render(
        <ArmyForm csrf={csrf} />,
        document.querySelector("#makeArmy")
      );
      ReactDOM.render(
        <ArmyList armies={[]}/>,
        document.querySelector('#armies')
      );
  
      loadArmiesFromServer();
      break;
  }
  

};

const getToken = () =>{
  sendAjax('GET', '/getToken', null, (result) =>{
    setup(result.csrfToken);
  });
};

$(document).ready(function(){
  getToken();
});
