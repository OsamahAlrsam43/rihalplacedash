/*const getCurrentDate=(separator='')=>{

let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    
}*/
const statestory = localStorage.getItem("state")

if (!statestory) {
    localStorage.setItem('state', JSON.stringify([{ wejha: "", datewsool: new Date(), datemgadera: new Date(), adultNo: 1, chdNo: 0, Room: 1 }]));
}


export const initialState = {
  
        serchdetails: [
        {
            wejha:
                    JSON.parse(localStorage.getItem("state"))[0].wejha,
                datewsool: JSON.parse(localStorage.getItem("state"))[0].datewsool,
                datemgadera: JSON.parse(localStorage.getItem("state"))[0].datemgadera,
                adultNo: JSON.parse(localStorage.getItem("state"))[0].adultNo,
                chdNo: JSON.parse(localStorage.getItem("state"))[0].chdNo,
                Room: JSON.parse(localStorage.getItem("state"))[0].Room
        }
        ]
    
};

export const saveState = (state) => {
  try {
   localStorage.setItem('state', JSON.stringify(state));
    
  } catch (err) {
      console.log(err)
    // ...error handling
  }
};

export const actiontype = {
    SET_SEARCH: "SET_SEARCH",
};

const reducer = (state, action) => {
    switch (action.type) {


          ///////////////SET_DTKSHF
        case actiontype.SET_SEARCH:
            return { ...state, serchdetails: action.items};
        
        default:
            return state;
    }
};

export default reducer;