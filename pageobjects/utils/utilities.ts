 class Utility {

    waitForElementToBeEnabled(property: any, timeOutMessage: String, timeInMilliSeconds: Number) {
        browser.waitUntil(() => property.isEnabled(),
          { timeout: timeInMilliSeconds, timeoutMsg: timeOutMessage });
      }
      waitForElementToBeClickable(property: any, timeOutMessage: String, timeInMIlliSeconds: Number) {
        browser.waitUntil(() => property.isClickable(),
          { timeout: timeInMIlliSeconds, timeoutMsg: timeOutMessage });
      }
      waitForElementToBeDispalyed(property: any, timeOutMessage: String, timeInMIlliSeconds: Number) {
        browser.waitUntil(() => property.isDisplayed(),
          { timeout: timeInMIlliSeconds, timeoutMsg: timeOutMessage });
      }


      select_Project_Hired_Date() {
        var today = new Date();
        var dd = today.getDate();
        var yyyy = today.getFullYear();       
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d = new Date();
        var monthName = months[d.getMonth()]; // "July" (or current month)
        //Nov 11,2021
        var reqDate=monthName+" "+dd+","+yyyy;
        return reqDate;
        }
    
    
}
export default new Utility();