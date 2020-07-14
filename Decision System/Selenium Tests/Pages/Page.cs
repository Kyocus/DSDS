
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using SeleniumExtras.WaitHelpers;
using Selenium_Tests;

public abstract class Page
{
    public Page(IWebDriver driver, string url)
    {
        this.Driver = driver;
        this.Url = url;
    }

    private IWebDriver driver;
    private string url;

    protected IWebDriver Driver { get => driver; set => driver = value; }
    protected string Url { get => url; set => url = value; }

    public virtual void Navigate()
    {
        Driver.Navigate().GoToUrl(GetBaseURL() + Url);

        string popupSelector = "#frmAgree button";

        try
        {
            WaitFor(popupSelector);
        }
        finally
        {
            ClickElement(popupSelector);
        }
    }

    public string GetBaseURL()
    {
        return Constants.getBaseURI();
        // just get the "base" bit of the URL
        //return new Uri(Driver.Url).Authority;
    }

    public void CheckAlert()
    {
        try
        {
            IAlert alert;
            WebDriverWait wait = new WebDriverWait(Driver, TimeSpan.FromSeconds(2));
            try
            {
                alert = wait.Until(AlertIsPresent());
            }
            catch (WebDriverTimeoutException)
            {
                alert = null;
            }
            alert.Accept();
        }
        catch (Exception e)
        {
            // exception handling
            throw (new Exception("alert failed"));
        }
    }

    protected IWebElement GetElement(String selector)
    {
        return WaitFor(selector);
    }

    protected IWebElement GetElement(IWebElement scope, String selector)
    {
        return scope.FindElement(By.CssSelector(selector));
    }

    protected ICollection<IWebElement> GetElements(IWebElement scope, String selector)
    {
        return scope.FindElements(By.CssSelector(selector));
    }

    protected void ClickElement(String selector)
    {
        WaitFor(selector);
        Driver.FindElement(By.CssSelector(selector)).Click();
    }

    protected void ClickFrameElement(String frameId, String selector)
    {
        new WebDriverWait(Driver, TimeSpan.FromSeconds(2))
            .Until(WaitUntilFrameLoadedAndSwitchToIt(By.Id(frameId)));
        this.ClickElement(selector);
        Driver.SwitchTo().DefaultContent();
    }

    protected IWebElement GetRowContainingText(String tableSelector, String text)
    {
        WaitFor(tableSelector);
        IList<IWebElement> rows = Driver.FindElements(By.CssSelector(tableSelector + " tr"));

        for (int i = 0; i < rows.Count; i++)
        {
            if (rows[i].Text.ToLower().Contains(text.ToLower()))
            {
                return rows[i];
            }
        }

        return null;
    }

    protected String GetSelectText(String selector)
    {
        WaitFor(selector);
        return new SelectElement(Driver.FindElement(By.CssSelector(selector)))
            .AllSelectedOptions[0].Text;
    }

    protected String GetText(String selector)
    {
        WaitFor(selector);
        return Driver.FindElement(By.CssSelector(selector)).Text;
    }

    protected String GetTextFromFrameElement(String frameId, String selector)
    {
        new WebDriverWait(Driver, TimeSpan.FromSeconds(5))
            .Until(WaitUntilFrameLoadedAndSwitchToIt(By.Id(frameId)));
        String returnMe = Driver.FindElement(By.CssSelector(selector)).Text;
        Driver.SwitchTo().DefaultContent();
        return returnMe;
    }

    protected String GetValueFromFrameElement(String frameId, String selector)
    {
        new WebDriverWait(Driver, TimeSpan.FromSeconds(5))
            .Until(WaitUntilFrameLoadedAndSwitchToIt(By.Id(frameId)));
        String returnMe = Driver.FindElement(By.CssSelector(selector)).GetAttribute("value");
        Driver.SwitchTo().DefaultContent();
        return returnMe;
    }

    protected void SetBooleanSelect(String selector, Boolean value)
    {
        WaitFor(selector);

        new SelectElement(Driver.FindElement(By.CssSelector(selector))).SelectByText(value ? "Yes" : "No");
    }

    protected void SetCheckbox(String selector, Boolean value)
    {
        WaitFor(selector);

        IWebElement chk = Driver.FindElement(By.CssSelector(selector));

        if ((value && !chk.Selected) || (!value && chk.Selected))
        {
            chk.Click();
        }
    }

    protected void SetCheckboxInFrameElement(String frameId, String selector, Boolean value)
    {
        new WebDriverWait(Driver, TimeSpan.FromSeconds(2))
            .Until(WaitUntilFrameLoadedAndSwitchToIt(By.Id(frameId)));
        this.SetCheckbox(selector, value);
        Driver.SwitchTo().DefaultContent();
    }

    protected void SetSelect(String selector, int index)
    {
        new SelectElement(Driver.FindElement(By.CssSelector(selector))).SelectByIndex(index);
    }

    protected void SetSelect(String selector, String value)
    {
        new SelectElement(Driver.FindElement(By.CssSelector(selector))).SelectByText(value);
    }

    protected void SetSelectInFrameElement(String frameId, String selector, String value)
    {
        new WebDriverWait(Driver, TimeSpan.FromSeconds(2))
            .Until(WaitUntilFrameLoadedAndSwitchToIt(By.Id(frameId)));
        this.SetSelect(selector, value);
        Driver.SwitchTo().DefaultContent();
    }

    protected void SetText(String selector, String value)
    {
        WaitFor(selector);

        IWebElement e = Driver.FindElement(By.CssSelector(selector));
        e.Clear();
        e.SendKeys(value);
    }

    protected void SetTextInFrameElement(String frameId, String selector, String text)
    {
        new WebDriverWait(Driver, TimeSpan.FromSeconds(5))
            .Until(WaitUntilFrameLoadedAndSwitchToIt(By.Id(frameId)));
        this.SetText(selector, text);
        Driver.SwitchTo().DefaultContent();
    }

    protected IWebElement WaitFor(String selector, int seconds = 10)
    {
        return new WebDriverWait(driver, TimeSpan.FromSeconds(seconds))
            .Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementExists(By.CssSelector(selector)));
    }

    protected IWebElement WaitForInteractable(String selector, int seconds = 10)
    {
        return new WebDriverWait(driver, TimeSpan.FromSeconds(seconds))
            .Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(By.CssSelector(selector)));
    }

    public void WaitForFrameToHide(String selector)
    {
        (new WebDriverWait(Driver, TimeSpan.FromSeconds(10)))
                .Until(drv => !drv.FindElement(By.CssSelector(selector)).Displayed);
    }

    protected void WaitUntilFrameLoaded(String frameId, String selector)
    {
        new WebDriverWait(Driver, TimeSpan.FromSeconds(2))
            .Until(WaitUntilFrameLoadedAndSwitchToIt(By.Id(frameId)));
        (new WebDriverWait(Driver, TimeSpan.FromSeconds(10)))
            .Until(WaitUntilFrameLoadedAndSwitchToIt(By.CssSelector(selector)));
        Driver.SwitchTo().DefaultContent();
    }

    private Func<IWebDriver, bool> WaitUntilFrameLoadedAndSwitchToIt(By byToFindFrame)
    {
        return (driver) =>
        {
            try
            {
                driver.SwitchTo().Frame(driver.FindElement(byToFindFrame));
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        };
    }

    /// <summary>
    /// An expectation for checking whether an element is visible.
    /// </summary>
    /// <param name="locator">The locator used to find the element.</param>
    /// <returns>The <see cref="IWebElement"/> once it is located, visible and clickable.</returns>
    public Func<IWebDriver, IWebElement> ElementIsClickable(By locator)
    {
        return driver =>
        {
            var element = driver.FindElement(locator);
            return (element != null && element.Displayed && element.Enabled) ? element : null;
        };
    }

    public Func<IWebDriver, IAlert> AlertIsPresent()
    {
        return (driver) =>
        {
            try
            {
                return driver.SwitchTo().Alert();
            }
            catch (NoAlertPresentException)
            {
                return null;
            }
        };
    }
}


