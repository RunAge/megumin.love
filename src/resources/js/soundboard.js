document.addEventListener('DOMContentLoaded', () => {
	let sounds = [];
	let howlerList = {};
	let ws;

	function loadSoundboard(s) {
		howlerList = {}; // Wipe before (re)load
		s = s.sort((a, b) => a.source === b.source ? a.displayname.localeCompare(b.displayname) : a.source.localeCompare(b.source));
		// Sort primarily by season and secondarily alphabetically within seasons

		const container = document.getElementById('container');
		container.innerHTML = '<p id="loading" style="text-align:center;font-size:48px;margin:0 auto;">Loading...</p>';

		if (s.length === 0) {
			return container.innerHtml = `
			<div id="backlink-top"><a class="backlink" href="/">Back</a></div>
			<a href="rankings" id="rankings">Rankings</a>
			<p id="warning" class="titles" style="font-size:50px">No sounds available.</p>
			<div id="backlink-bottom"><a class="backlink" href="/">Back</a></div>
			`;
		}

		const topBacklinkDiv = document.createElement('div');
		const topBacklinkAnchor = document.createElement('a');

		topBacklinkDiv.id = 'backlink-top';
		topBacklinkAnchor.classList.add('backlink');
		topBacklinkAnchor.href = '/';
		topBacklinkAnchor.innerText = 'Back';
		topBacklinkDiv.appendChild(topBacklinkAnchor);

		container.appendChild(topBacklinkDiv);

		const rankingsAnchor = document.createElement('a');
		rankingsAnchor.id = 'rankings';
		rankingsAnchor.href = 'rankings';
		rankingsAnchor.innerText = 'Rankings';

		container.appendChild(rankingsAnchor);

		// Create buttons and make them play corresponding sounds
		for (const sound of s) {
			const sourceName = sound.source.replace(/\s/g, '-').toLowerCase();
			const sourceButtonWrapper = document.getElementById(`${sourceName}-buttons`);
			// Source as in "Season 1", "Season 1 OVA", etc

			howlerList[sound.filename] = new Howl({
				src: [`/sounds/${sound.filename}.ogg`, `/sounds/${sound.filename}.mp3`],
			});

			if (sound.filename === 'realname') continue;
			// Don't create button for this one

			if (sourceButtonWrapper) {
				const soundButton = document.createElement('button');
				soundButton.id = sound.filename;
				soundButton.innerText = sound.displayname;

				sourceButtonWrapper.appendChild(soundButton);
			}
			else {
				const sourceWrapper = document.createElement('div');
				sourceWrapper.classList.add('source-wrappers');

				container.appendChild(sourceWrapper);

				const sourceTitle = document.createElement('h1');
				sourceTitle.classList.add('titles');
				sourceTitle.innerText = `${sound.source}:`;

				sourceWrapper.appendChild(sourceTitle);

				const sourceButtonsWrapper = document.createElement('div');
				sourceButtonsWrapper.classList.add('buttons-wrapper');
				sourceButtonsWrapper.id = `${sourceName}-buttons`;

				sourceWrapper.appendChild(sourceButtonsWrapper);

				if (!document.getElementById(`${sound.filename}`)) {
					const soundButton = document.createElement('button');
					soundButton.id = sound.filename;
					soundButton.innerText = sound.displayname;

					sourceButtonsWrapper.appendChild(soundButton);
				}
			}

			if (sound.filename === 'name') {
				document.getElementById('name').addEventListener('click', e => {
					const rsound = Math.floor(Math.random() * 100) + 1;

					if (rsound === 42) {
						howlerList.realname.play();
						ws.send(JSON.stringify({ type: 'sbClick', soundFilename: sound.filename }));
					}
					else {
						howlerList.name.play();
						ws.send(JSON.stringify({ type: 'sbClick', soundFilename: sound.filename }));
					}
				});

				continue;
				// Create button but don't use standard click function
			}

			document.getElementById(sound.filename).addEventListener('click', e => {
				howlerList[sound.filename].play();
				return ws.send(JSON.stringify({ type: 'sbClick', soundFilename: sound.filename }));
			});

			document.getElementById(sound.filename).addEventListener('keypress', e => {
				if (e.key === 'Enter') return e.preventDefault();
				// Don't trigger the button on 'enter' keypress
			});
		}

		const bottomBacklinkDiv = document.createElement('div');
		const bottomBacklinkAnchor = document.createElement('a');

		bottomBacklinkDiv.id = 'backlink-bottom';
		bottomBacklinkAnchor.classList.add('backlink');
		bottomBacklinkAnchor.href = '/';
		bottomBacklinkAnchor.innerText = 'Back';
		bottomBacklinkDiv.appendChild(bottomBacklinkAnchor);

		container.appendChild(bottomBacklinkDiv);

		document.getElementById('loading').remove();
	}

	fetch('/api/sounds').then(res => res.json()).then(s => {
		sounds = s;
		loadSoundboard(sounds);
	}).then(() => {
		fetch('/api/conInfo').then(res => res.json()).then(con => {
			const domainOrIP = document.URL.split('/')[2].split(':')[0];
			const host = con.ssl ? `wss://${domainOrIP}` : `ws://${domainOrIP}:${con.port}`;

			ws = new WebSocket(host);

			ws.addEventListener('open', event => {
				ws.addEventListener('message', message => {
					let data;

					try {
						data = JSON.parse(message.data);
					}
					catch (e) {
						data = {};
					}

					if (!['counterUpdate', 'soundUpdate', 'crazyMode', 'notification'].includes(data.type)) return;

					if (data.type === 'soundUpdate' && data.sounds) {
						data.sounds.changedSounds.map(changedSound => sounds[sounds.findIndex(snd => snd.id === changedSound.id)] = changedSound); // eslint-disable-line max-nested-callbacks, max-len
						data.sounds.deletedSounds.map(deletedSound => sounds.splice(sounds.findIndex(snd => snd.id === deletedSound.id), 1)); // eslint-disable-line max-nested-callbacks, max-len
						data.sounds.addedSounds.map(addedSound => sounds.push(addedSound));
						// Compare IDs because all other fields may have changed, id the only constant

						return loadSoundboard(sounds); // Reload with now-modified sounds array
					}
					else if (data.type === 'crazyMode' && localStorage.getItem('crazyMode')) {
						return howlerList[data.soundFilename].play();
					}
					else if (data.type === 'notification' && data.notification) {
						document.getElementById('notification').innerText = data.notification.text;
						return util.fade(document.getElementById('notification-wrapper'), data.notification.duration * 1000, 0.1);
					}
				});
			});
		});
	});
});