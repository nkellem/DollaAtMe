//Sends op weapon data to the server to save skins
const handleEntrySubmit = e => {
	e.preventDefault();
	const opName = document.querySelector('#operatorSelect').value;
	const weaponName = document.querySelector('#opGun').value;
	const skin = document.querySelector('#gunSkin').value;
	const entryForm = document.querySelector('#newEntryForm');

	if (opName === '' || weaponName === '' || skin === '') {
		handleError('All fields are required');
		return false;
	}

	sendAjax(entryForm.getAttribute('method'), entryForm.getAttribute('action'), serialize(newEntryForm), () => {
		alert('Skin added!');
		document.querySelector('#operatorSelect').value = '';
		document.querySelector('#gunSkin').value = '';
		createWeaponSelect([]);
	});

	return false;
};

//React Component for the nav bar so the user can go back to the home page
const HomeNav = props => {
  return (
    <a href="#" onClick={createTracker}>Home</a>
  );
};

//React Component to create dynamic options for the weapons select
const OpWeaponOption = props => {
	return (
		<option value={props.weaponName}>{props.weaponName}</option>
	);
};

//React Component that creates the weapons select
const OpWeaponOptions = props => {
	let options = [];

	props.weapons.forEach(weapon => {
		options.push(<OpWeaponOption weaponName={weapon}/>);
	});

	if (props.summary) {
		return (
			<select name="weaponName" onChange={e => loadWeaponSkinList(e, props.skins)}>
	    	<option value="">Select A Gun</option>
				{options}
	    </select>
		);
	} else {
		return (
			<select name="weaponName">
	    	<option value="">Select A Gun</option>
				{options}
	    </select>
		);
	}
};

//React Component for rendring the New Entry form
const NewEntryForm = props => {
  return (
    <div id="formDiv">
      <form action="/addNewEntry" method="POST" name="newEntryForm" onSubmit={handleEntrySubmit} id="newEntryForm">
        <select name="opName" id="operatorSelect" onChange={loadOpWeaponOptions}>
          <option value="">Select An Op</option>
          <option value="Ash">Ash</option>
          <option value="Blackbeard">Blackbeard</option>
          <option value="Blitz">Blitz</option>
          <option value="Buck">Buck</option>
          <option value="Capitao">Capitao</option>
          <option value="Fuze">Fuze</option>
          <option value="Glaz">Glaz</option>
          <option value="Hibana">Hibana</option>
          <option value="IQ">IQ</option>
          <option value="Montagne">Montagne</option>
          <option value="Sledge">Sledge</option>
          <option value="Thatcher">Thatcher</option>
          <option value="Thermite">Thermite</option>
          <option value="Twitch">Twitch</option>
          <option value="Bandit">Bandit</option>
          <option value="Castle">Castle</option>
          <option value="Caveira">Caveira</option>
          <option value="Doc">Doc</option>
          <option value="Echo">Echo</option>
          <option value="Frost">Frost</option>
          <option value="Jager">Jager</option>
          <option value="Kapkan">Kapkan</option>
          <option value="Mute">Mute</option>
          <option value="Pulse">Pulse</option>
          <option value="Rook">Rook</option>
          <option value="Smoke">Smoke</option>
          <option value="Tachanka">Tachanka</option>
          <option value="Valkyrie">Valkyrie</option>
        </select>
				<span id="opGun"></span>
        <input id="gunSkin" type="text" name="skin" placeholder="Enter a Skin" />
        <input id="submitEntry" type="submit" value="submit" />
      </form>
    </div>
  );
};

//Renders the new entry form
const createNewEntryForm = () => {
  ReactDOM.render(
    <NewEntryForm />,
    document.querySelector('#mainContent')
  );
};

//Renders the nav bar for the new entry page
const createNewEntryFormNav = () => {
  ReactDOM.render(
    <HomeNav />,
    document.querySelector('nav')
  );
};

//Renders the weapon select in the new entry form
const createWeaponSelect = weapons => {
	ReactDOM.render(
		<OpWeaponOptions weapons={weapons}/>,
		document.querySelector('#opGun')
	);
};

//Renders the entire new entry page
const createNewEntry = e => {
  if (e) {
    e.preventDefault();
  }
  createNewEntryFormNav();
  createNewEntryForm();
	createWeaponSelect([]);
};

//Renders the Weapon select and dynamically loads the weapon options based on the operator selected
const loadOpWeaponOptions = e => {
	let opWeapons = opGuns[e.target.value];
	createWeaponSelect(opWeapons);
};
