const axios = require("axios");
const dev = process.env.NODE_ENV !== "production";
const site = dev ? require("../config").site : process.env.SITE;

function keepalive() {
  var fetcher = axios(`https://test-to.herokuapp.com/api/v1/torrent/list`);
  var choice = 0;
  for (var i in fetcher["torrents"]){
	if(i.status == "Downloading"){
		choice = 1;
		break;
	}
  }
  if (site && choice == 1) {
    setInterval(async () => {
      const data = await axios(`https://ping-pong-sn.herokuapp.com/pingback?link=${site}`);
      console.log("keep alive triggred, status: ", data.status);
    }, 1560000);
  } else {
    console.warn("No torrent to download");
  }
}

module.exports = keepalive;
