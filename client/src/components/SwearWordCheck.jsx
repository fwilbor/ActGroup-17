//import { Wlists } from "../pages/Home";

//import { readString } from 'react-papaparse';
//import SwearWordsListCSV from '../components/SwearWordsList.csv';

function SwearWordCheck(msg){
    
    /*const papaConfig = {
        complete: (results, file) => {
          //console.log('Parsing complete:', results, file);
        },
        download: true,
        error: (error, file) => {
          //console.log('Error while parsing:', error, file);
        },
      };
    const Wlists = readString(SwearWordsListCSV, papaConfig);
    //console.log(Wlists.data.data);
*/
   const wlists = ['testx', 'Textx', 'xxx', 'Adult', 'Ass', 'Asswhole', 'Bastard', 'Bitch', 'child-fucker', 'childfucker', 'cock', 'cocksucker', 'crap', 'cunt', 'damn', 'dick', 'dickhead', 'dyke', 'fatherfucker', 'frigger', 'Fuck', 'fucker', 'Fuckoff', 'goddamn', 'godsdamn', 'Hell', 'Idiot', 'Jesus fuck', 'kike', 'motherfucker', 'Nigga', 'nigra', 'Piss', 'prick', 'pussy', 'Shit', 'shit ass', 'shite', 'sisterfucker', 'slut', 'son of a bitch', 'son of a whore', 'spastic', 'sweet Jesus', 'Testx', 'twat', 'wanker', 'Words', 'xxx', 'porn'];
   for (const wlist of wlists) {
     
  //for (const wlist of Wlists) {        
        //console.log(wlist);
        //if (msg.toLowerCase().indexOf(wlist.toLowerCase()) !== -1) {
        if (msg.toLowerCase().includes(wlist.toLowerCase())) {
          return "Yes";
         }     
    }
    return "No";       
    //msg.length;
}

export default SwearWordCheck