using OpenQA.Selenium;

// Requires reference to WebDriver.Support.dll
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;

public class IndexPage : Page
{
    public IndexPage(IWebDriver driver) : base(driver, "/Index.html")
    {
    }

    public IWebElement DecisionsNavButton()
    {
        return GetElement("#app li.nav-item.decisions");
    }

    public IWebElement GroupsNavButton()
    {
        return GetElement("#app li.nav-item.groups");
    }

    public IWebElement VotersNavButton()
    {
        return GetElement("#app li.nav-item.voters");
    }

    public IWebElement CreateButton()
    {
        return GetElement("#app button.create-button");
    }

    public IWebElement SaveButton()
    {
        return GetElement("#app button.save-button");
    }

    public IWebElement DeleteButton()
    {
        return GetElement("#app button.delete-button");
    }


    public IWebElement FirstNameField()
    {
        return GetElement("#app div.first-name input");
    }

    public IWebElement MiddleNameField()
    {
        return GetElement("#app div.middle-name input");
    }

    public IWebElement LastNameField()
    {
        return GetElement("#app div.last-name input");
    }

    public IWebElement AddressField()
    {
        return GetElement("#app div.address input");
    }

    public IWebElement CityField()
    {
        return GetElement("#app div.city input");
    }

    public IWebElement StateField()
    {
        return GetElement("#app div.state input");
    }

    public IWebElement ZipField()
    {
        return GetElement("#app div.zip input");
    }



}