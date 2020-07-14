using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

public class Steps
{
    IndexPage page;

    public Steps(IWebDriver driver)
    {
        page = new IndexPage(driver);
    }

    public void click_create()
    {
        page.CreateButton().Click();
    }

    public void click_save()
    {
        page.SaveButton().Click();
    }

    public void click_delete()
    {
        page.DeleteButton().Click();
    }

    public void create_voter(/*string firstName, string middleName, string lastName, string address, string city, string state, string zip*/)
    {
        page.VotersNavButton().Click();
        page.CreateButton().Click();
        page.FirstNameField().SendKeys("firstname");
        page.MiddleNameField().SendKeys("middlename");
        page.LastNameField().SendKeys("lastname");
        page.AddressField().SendKeys("address");
        page.CityField().SendKeys("city");
        page.StateField().SendKeys("st");
        page.ZipField().SendKeys("12345");
        page.SaveButton().Click();
        page.VotersNavButton().Click();
    }


    public void navigate()
    {
        this.page.Navigate();
    }
}

