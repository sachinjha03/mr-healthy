let yogaFlexSection = document.querySelector(".yoga-flex-section")



const fetchYoga = async() => {
    try{
        const response = await fetch("https://yoga-api-nzy4.onrender.com/v1/poses");
        if(response.ok){
            const result = await response.json()
            const requiredData = result.slice(0, 6);
            requiredData.forEach(element => {
                let yogaCard = document.createElement("div")
                let aboutYoga = document.createElement("div")
                let yogaCardImg = document.createElement("img")
                let yogaName = document.createElement("h4")
                let yogaDescription = document.createElement("p")
                let yogaBenefitTitle = document.createElement("h4")
                let yogaBenefit = document.createElement("p")
                
                yogaCard.className = "yoga-card";
                aboutYoga.className = "about-yoga";


                yogaCardImg.src = element.url_png;
               yogaName.innerHTML = element.english_name;
               yogaDescription.innerHTML = element.pose_description;
               yogaBenefitTitle.innerHTML = "Benefit of This Pose"
               yogaBenefit.innerHTML = element.pose_benefits;

               aboutYoga.appendChild(yogaName);
               aboutYoga.appendChild(yogaDescription);
               aboutYoga.appendChild(yogaBenefitTitle);
               aboutYoga.appendChild(yogaBenefit);

               yogaCard.appendChild(yogaCardImg);
               yogaCard.appendChild(aboutYoga);

               yogaFlexSection.appendChild(yogaCard);
            });
        }
    }catch(err){
        console.log(err);
    }
}
fetchYoga()



document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let height = document.getElementById("bmiHeight").value;
    let weight = document.getElementById("bmiWeight").value;

    if(height<0 || weight<0){
        document.getElementById("bmiErrorMessage").innerHTML = "Please entered valid value!!"
    }
    else{
        let calculateBmi = weight/Math.pow((height/100),2)
        document.getElementById("bmiScore").innerHTML = `Your BMI score is ${calculateBmi.toFixed(2)}`
        if(calculateBmi<18.5){
            document.getElementById("bmiImage").src = "./images/underweight.png"
            document.getElementById("bmiResult").innerHTML = "Under Weight"
        }
        else if(calculateBmi>18.5 && calculateBmi<24.9){
            document.getElementById("bmiImage").src = "./images/healthy.png"
            document.getElementById("bmiResult").innerHTML = "Healthy"
        }
        else if(calculateBmi>25 && calculateBmi<29.9){
            document.getElementById("bmiImage").src = "./images/overweight.png"
            document.getElementById("bmiResult").innerHTML = "Over Weight"
        }
        else{
            document.getElementById("bmiImage").src = "./images/obesity.png"
            document.getElementById("bmiResult").innerHTML = "Obesity"
        }
    }
});


document.getElementById("calorieForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let age = document.getElementById("calorieAge").value;
    let height = document.getElementById("calorieHeight").value;
    let weight = document.getElementById("calorieWeight").value;
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let exercise = document.querySelector('input[name="activity"]:checked').value;
    let activityArray = [1.2, 1.375, 1.55, 1.725, 1.9];
    let activityDone = activityArray[exercise-1];

    if(height<0 || weight<0 || age<0){
        document.getElementById("calorieErrorMessage").innerHTML = "Please entered valid value!!"
        document.getElementById("calorieErrorMessage").style.color = "orangered"
    }else{
        let bmr = (gender === 'male')
        ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
        : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        
        let cal = bmr * activityDone;
        
        document.querySelector(".red-msg").innerHTML = `To Loose Weight , Consume ${(cal-(0.20*cal)).toFixed(2)} cal`
        document.querySelector(".green-msg").innerHTML = `To Loose Weight , Consume ${(cal).toFixed(2)} cal`
        document.querySelector(".blue-msg").innerHTML = `To Loose Weight , Consume ${(cal+(0.20*cal)).toFixed(2)} cal`
    }

})