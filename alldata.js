const fs = require("fs");
const cheerio = require("cheerio");
const writeXlsxFile = require('write-excel-file/node');
const request = require("request");
const puppy=require("puppeteer");

let givenseries= process.argv[2];
const actuallink = `https://www.espncricinfo.com/series/${givenseries}/match-results`;


// const series = "ipl-2020-21-1210595";


request(actuallink, funcallback);

 function funcallback(err, res, html){
   const $=cheerio.load(html);

   const allmatches=$('[data-hover="Scorecard"]');


for(let i=0;i<allmatches.length;i++){
   let halfurl=$(allmatches[i]).attr("href");
    let url=("https://www.espncricinfo.com"+halfurl);
    
    request(url, callbackfun.bind(this,  allmatches.length, halfurl));
}
// console.log(allmatches.length);

}



let count=0;
  function callbackfun( arrlength, halfurl, err, res, html) {
  count++;
  const onlyfirstfour = [];
   const $ = cheerio.load(html);

   const alltables = $(".table");
  
   for (let i = 0; i < 4; i++) {
      const alltrs = $(alltables[i]).find("tr");
      // console.log($(alltrs[i]).text());
     
      onlyfirstfour.push({
         // 'inning': i + 1,
         data: []
      })
      for (let tr = 0; tr < alltrs.length; tr++) {
         // console.log($(alltrs[tr]).find("td").length);
         if(i==0 || i==2){
         if ($(alltrs[tr]).find("td").length == 8) {
            
            let onemember = {
               name: "",
               outby: "",
               run: "",
               ball: "",
               fours: "",
               sixs: "",
               strikerate: ""
            }

            for (let j = 0; j < alltrs.length; j++) {
               let tdarray = $($(alltrs[tr]).find('td')[j]);
               if (j == 0) {
                  onemember.name = tdarray.text();
                  //    console.log("----------------------------");
                  //    console.log(tdarray.text());
                  //    console.log("----------------------------");

               } if (j == 1) {
                  onemember.outby = tdarray.text();
               } if (j == 2) {
                  onemember.run = tdarray.text();
               } if (j == 3) {
                  onemember.ball = tdarray.text();
               } if (j == 4) {
                  continue;
               } if (j == 5) {
                  onemember.fours = tdarray.text();
               } if (j == 6) {
                  onemember.sixs = tdarray.text();
               } if (j == 7) {
                  onemember.strikerate = tdarray.text();
               }
            }
            
             onlyfirstfour[i].data.push(onemember);

         } else {
            continue;
         }
      }else{
         if($(alltrs[tr]).find("td").length == 11){
         let onemember = {
            name: "",
            O: "",
            M: "",
            R: "",
            W: "",
            ECON: "",
            zeroes: "",
            fours: "",
            sixs: "",
            WD: "",
            NB: ""
         }

         for (let j = 0; j < alltrs.length; j++) {
            let tdarray = $($(alltrs[tr]).find('td')[j]);
            if (j == 0) {
               onemember.name = tdarray.text();
               //    console.log("----------------------------");
               //    console.log(tdarray.text());
               //    console.log("----------------------------");

            } if (j == 1) {
               onemember.O = tdarray.text();
            } if (j == 2) {
               onemember.M = tdarray.text();
            } if (j == 3) {
               onemember.R = tdarray.text();
            } if (j == 4) {
               onemember.W = tdarray.text();
            } if (j == 5) {
               onemember.ECON = tdarray.text();
            } if (j == 6) {
               onemember.zeroes = tdarray.text();
            } if (j == 7) {
               onemember.fours = tdarray.text();
            }if (j == 8) {
               onemember.sixs = tdarray.text();
            }if (j == 9) {
               onemember.WD = tdarray.text();
            }if (j == 10) {
               onemember.NB = tdarray.text();
            }
         } onlyfirstfour[i].data.push(onemember);
      }
      }
      }
   }


   // fs.writeFileSync("temp.JSON", JSON.stringify(onlyfirstfour));


const schema1 = [
   // Column #1
   {
     column: 'Name',
     type: String,
     align: 'center',   
     value: student => student.name,
 
   },
   // Column #2
   {
     column: 'outby',
     type: String,
     align: 'center',
     value: student => student.outby
   },
   // Column #3
   {
     column: 'run',
     type: String,
     align: 'center',
     value: student => student.run
   },
   // Column #4
   {
     column: 'ball',
     type: String,
     value: student => student.ball,
     align: 'center', 
   },
   {
       column: 'fours',
       type: String,
       value: student => student.fours,
       align: 'center', 
     },
     {
       column: 'sixs',
       type: String,
       value: student => student.sixs,
       align: 'center', 
     },
     {
       column: 'strikerate',
       type: String,
     value: student => student.strikerate,
     align: 'center', 
     },
   
 ]
 const schema2 = [
   // Column #1
   {
     column: 'Name',
     type: String,
     align: 'center',
     value: student => student.name,
     align: 'center', 
   },
   // Column #2
   {
     column: 'O',
     type: String,
     align: 'center',
     value: student => student.O,
     align: 'center', 
   },
   // Column #3
   {
     column: 'M',
     type: String,
     align: 'center',
     value: student => student.M,
     align: 'center', 
   },
   // Column #4
   {
     column: 'R',
     type: String,
     value: student => student.R,
     align: 'center', 
   },
   {
       column: 'W',
       type: String,
       value: student => student.W,
       align: 'center', 
     },
     {
       column: 'ECON',
       type: String,
       value: student => student.ECON,
       align: 'center', 
     },
     {
       column: 'zeroes',
       type: String,
     value: student => student.zeroes,
     align: 'center', 
     },
     {
      column: 'fours',
      type: String,
    value: student => student.fours,
    align: 'center', 
    }, 
     {
      column: 'sixes',
      type: String,
    value: student => student.sixs,
    align: 'center', 
    },
    {
      column: 'WD',
      type: String,
    value: student => student.WD,
    align: 'center', 
    },
    {
      column: 'NB',
      type: String,
    value: student => student.NB,
    align: 'center', 
    },
 ]
//  console.log(typeof(onlyfirstfour[0].data));

  let filename=halfurl.split("/")[3];

   excel(filename,onlyfirstfour[0].data, onlyfirstfour[1].data,onlyfirstfour[2].data,onlyfirstfour[3].data,schema1, schema2);
//   if (count==arrlength){
// fs.writeFileSync("temp.JSON", JSON.stringify(onlyfirstfour));
// }
  
  

}
async function excel(filename,object1, object2,object3, object4 , schema1, schema2){
   await writeXlsxFile([object1, object2, object3, object4], {
       schema: [schema1, schema2,schema1, schema2],
       sheets: ['1st inning  batsmans', '1st inning bowlers','2nd inning  batsmans', '2nd inning bowlers'],
       filePath: `H:/webscrapping using cheerio/cricinfoscrapper/allbatsmanbowlerdata/${filename}.xlsx`
       
     })
    
  
   
  
   }

   
  