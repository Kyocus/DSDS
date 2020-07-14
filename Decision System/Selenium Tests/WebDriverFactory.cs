using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
/**
This class handles building WebDrivers with the correct configuration.

*/
public class WebDriverFactory
{

    /**
       Get a webdriver with appropriate config.
       param headless boolean - set to true to run headless.
       
       todo - add a parameter to specify the browser
       */
    public static IWebDriver getWebDriver(bool headless)
    {
        IWebDriver driver = null;

        if (headless)
        {
            ChromeOptions options = setupWebDriverHeadless();
            driver = new ChromeDriver(options);
        }
        else
        {
            ChromeOptions options = setupWebDriver();
            driver = new ChromeDriver(options);
        }
        return driver;
    }

    /**
this needs to point to the location of the webdriver file on your machine
*/
    private static String getNonDynamicLocation()
    {
        return "(chromedriverpath)\\chromedriver2.37.exe";
    }


    private static ChromeOptions setupWebDriver()
    {
        ChromeOptions options = new ChromeOptions();
        options.AddAdditionalCapability("useAutomationExtension", false);
        return options;
    }


    private static ChromeOptions setupWebDriverHeadless()
    {
        ChromeOptions options = setupWebDriver();
        options.AddArguments("headless");
        options.AddArguments("disable-gpu");
        options.AddAdditionalCapability("useAutomationExtension", false);
        //options.addArguments("window-size=1200x600");
        return options;
    }
}

