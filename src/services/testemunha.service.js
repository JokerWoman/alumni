import API_URL from "./config.js";

export const TestimonyService = {

    async getAllTestimonies(){
        var url = new URL(`${API_URL}/testemunha/`);
    
        const response = await fetch(url,{
            method: "GET"
        })

        if (response.ok){
            let data = await response.json();
            console.log(data.message)
            return data.message;
        }else{
            return null;
        }
    }
  };
  
  export default TestimonyService;