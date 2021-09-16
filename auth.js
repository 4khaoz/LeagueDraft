const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const creds = require('./creds.json');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const client = new google.auth.JWT(
    creds.client_email, 
    null, 
    creds.private_key, 
    SCOPES, 
)

client.authorize(function(err, tokens) {
    if (err)
    {
        console.log(err);
        return;
    }

    readDataFromGS(client);
})


async function readDataFromGS(cl)
{
    const gsapi = google.sheets({version: "v4", auth: cl});

    const opt = {
        spreadsheetId: creds.spreadsheet_id,
        ranges: [
			'LoLDK1!A2:A149',
			'LoLDK1!EW2:EW149',
			'LoLDK1!EX2:EX149',
			'LoLDK1!EY2:EY149',
			'LoLDK1!EZ2:EZ149',
			'LoLDK1!FA2:FA149',
			'LoLDK1!FB2:FB149',
			'LoLDK1!FC2:FC149',
			'LoLDK1!FD2:FD149',
			'LoLDK1!FE2:FE149',
			'LoLDK1!FF2:FF149',
			'LoLDK1!FG2:FG149',
			'LoLDK1!FH2:FH149',
			'LoLDK1!FI2:FI149'
		],
    };

    await gsapi.spreadsheets.values.batchGet(opt, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);

		console.log("Reading Sheets")
		champ = res.data.valueRanges[0];
		duelist = res.data.valueRanges[1];
		domination = res.data.valueRanges[2];
		tank = res.data.valueRanges[3];
		guardian = res.data.valueRanges[4];
		destruction = res.data.valueRanges[5];
		engage = res.data.valueRanges[6];
		punisher = res.data.valueRanges[7];
		joker = res.data.valueRanges[8];
		slayer = res.data.valueRanges[9];
		glob = res.data.valueRanges[10];
		diseng = res.data.valueRanges[11];
		cc = res.data.valueRanges[12];
		mobility = res.data.valueRanges[13];
        
        var obj = { }
		for (i = 0; i < 148; i++)
		{
			try {
				obj[champ.values[i][0]] = {
					'name': champ.values[i][0],
					'index': i + 2,
					'duelist': parseInt(duelist.values[i][0]),
					'domination': parseInt(domination.values[i][0]),
					'tank': parseInt(tank.values[i][0]),
					'guardian': parseInt(guardian.values[i][0]),
					'destruction': parseInt(destruction.values[i][0]),
					'engage': parseInt(engage.values[i][0]),
					'punisher': parseInt(punisher.values[i][0]),
					'joker': parseInt(joker.values[i][0]),
					'slayer': parseInt(slayer.values[i][0]),
					'global': parseInt(glob.values[i][0]),
					'disengage': parseInt(diseng.values[i][0]),
					'crowdcontrol': parseInt(cc.values[i][0]),
					'mobility': parseInt(mobility.values[i][0]),
				};
			} catch (error) {	
				console.log(error)
			}
		}

		var json = JSON.stringify(obj, null, 4);

		try {
			var datapath = path.resolve(__dirname, "data.json");
		
			fs.writeFileSync(datapath, json, 'utf8', function (err) {
				if (err) throw err;
				console.log('Saved!');
			});
		} catch (error) {
			console.log(error)
			console.log("Failed to write File")
		}
	});
}

