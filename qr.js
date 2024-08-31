const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Maher_Zubair,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("maher-zubair-baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function SIGMA_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Maher_Zubair = Maher_Zubair({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Maher_Zubair.ev.on('creds.update', saveCreds)
			Qr_Code_By_Maher_Zubair.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Maher_Zubair.sendMessage(Qr_Code_By_Maher_Zubair.user.id, { text: '' + b64data });
	
				   let SIGMA_MD_TEXT = `
*𝐉𝐎𝐇𝐍𝐋𝐄𝐎-𝐌𝐃 𝐈𝐒 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘*

> Copy the above session Id and deploy *JOHNLEO-MD*.

*𝐅𝐎𝐋𝐋𝐎𝐖 𝐎𝐔𝐑 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 𝐖𝐀.𝐂𝐇𝐀𝐍𝐍𝐄𝐋* 
> https://whatsapp.com/channel/0029VamlYh41SWssaEvw4E2i

*𝐅𝐎𝐋𝐋𝐎𝐖 𝐌𝐄 𝐎𝐍 𝐆𝐈𝐓𝐇𝐔𝐁*
> https://github.com/johnleosmith

*𝐉𝐎𝐈𝐍 𝐓𝐇𝐄 𝐖𝐀 𝐃𝐈𝐒𝐂𝐔𝐒𝐒𝐈𝐎𝐍 𝐆𝐑𝐎𝐔𝐏*
> https://chat.whatsapp.com/GkOeZ2eLZhx6lenAq1z83o

*𝐅𝐎𝐋𝐋𝐎𝐖 𝐎𝐔𝐑 𝐓𝐄𝐋𝐄𝐆𝐑𝐀𝐌 𝐂𝐇𝐀𝐍𝐍𝐄𝐋*
> https://t.me/JohnleoTech

*𝐅𝐎𝐋𝐋𝐎𝐖 𝐎𝐔𝐑 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐂𝐇𝐀𝐍𝐍𝐄𝐋*
> https://www.youtube.com/@JohnleoTech

> ✅✅ 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐉𝐎𝐇𝐍𝐋𝐄𝐎 𝐓𝐄𝐂𝐇✅✅`
					
	 await Qr_Code_By_Maher_Zubair.sendMessage(Qr_Code_By_Maher_Zubair.user.id,{text:SIGMA_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Maher_Zubair.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					SIGMA_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await SIGMA_MD_QR_CODE()
});
module.exports = router
