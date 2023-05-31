//import { Wlists } from "../pages/Home";

//import { readString } from 'react-papaparse';
//import SwearWordsListCSV from '../components/SwearWordsList.csv';
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
    //Testing
*/
//for (const wlist of Wlists) {        
        //console.log(wlist);
        //if (msg.toLowerCase().indexOf(wlist.toLowerCase()) !== -1) {
          /*const temp1 = wlist.toLowerCase()+ " ";
          const temp2 = " " + wlist.toLowerCase();
          const temp3 = wlist.toLowerCase()+ "!";
          const temp4 = wlist.toLowerCase()+ ".";*/

function SwearWordCheck(msg){
  console.log(msg)
   const wlists = ['wtf', 'Textxx', 'xxx', 'Adult', 'Ass', 'Asswhole', 'Bastard', 'Bitch', 'child-fucker', 'childfucker', 'cock', 'cocksucker', 'crap', 'cunt', 'damn', 'dick', 'dickhead', 'dyke', 'fatherfucker', 'frigger', 'Fuck', 'fucker', 'Fuckoff', 'goddamn', 'godsdamn', 'Hell', 'Idiot', 'Jesus fuck', 'kike', 'motherfucker', 'Nigga', 'nigra', 'Piss', 'prick', 'pussy', 'Shit', 'shit ass', 'shite', 'sisterfucker', 'slut', 'son of a bitch', 'son of a whore', 'spastic', 'sweet Jesus', 'twat', 'wanker', 'whore', 'Words', 'xxx', 'porn'];
   for (const wlist of wlists) {
        if (msg.toLowerCase().includes(wlist.toLowerCase())) {
          const tchars = [' ', '!', '.', '@', '$'];
          for (const tchar of tchars) {
            if (msg.toLowerCase().includes(wlist.toLowerCase()+tchar) || msg.toLowerCase().includes(tchar+wlist.toLowerCase()) || msg.length === wlist.length) {
            return "Yes";
          }
         }     
        }
    }
    return "No";       
}
export default SwearWordCheck