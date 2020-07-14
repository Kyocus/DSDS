
/*
* For information about the Screenplay pattern,
* http://thucydides.info/docs/serenity-staging/#_serenity_and_the_screenplay_pattern
*
* and some good practices
* https://www.blazemeter.com/blog/top-15-ui-test-automation-best-practices-you-should-follow
*/

using OpenQA.Selenium;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.IO;
using System;
//using ExcelDataReader;

[TestClass]
public abstract class BaseTest
{

    [ClassCleanup]
    public static void ClassCleanup()
    {
    }

    [ClassInitialize]
    public static void ClassInitialize()
    {
    }

    protected IWebDriver driver;

    //LoginSteps loginSteps = new LoginSteps();
    //LogoutSteps logoutSteps = new LogoutSteps();

    [TestInitialize]
    //@Before
    public virtual void Initialize()
    {
        this.driver = WebDriverFactory
                 .getWebDriver(false);
        //.getIEWebDriver();
        //this.loginSteps.login_as(this.driver, Constants.admin);
    }

    [TestCleanup]
    //@After
    public virtual void Cleanup()
    {
        //this.logoutSteps.logout(this.driver);
        this.driver.Close();
        this.driver.Quit();
        this.driver.Dispose();
    }


    //public void ReadData(string path)
    //{
    //    path = "C:\\Users\\matthew.dotson1\\Documents\\logins.xlsx";

    //    using (var stream = File.Open(path, FileMode.Open, FileAccess.Read))
    //    {
    //        // Auto-detect format, supports:
    //        //  - Binary Excel files (2.0-2003 format; *.xls)
    //        //  - OpenXml Excel files (2007 format; *.xlsx)
    //        using (var reader = ExcelReaderFactory.CreateReader(stream))
    //        {
    //            do
    //            {
    //                while (reader.Read())
    //                {
    //                    string message = this.runTest(reader.GetString(0));
    //                    FileInfo fi = new FileInfo("C:\\Users\\matthew.dotson1\\Documents\\logins.xlsx");
    //                    //sheet.getRow(i).createCell(2).setCellValue(message.ToString());
    //                }
    //            } while (reader.NextResult());
    //            // The result of each spreadsheet is in result.Tables
    //        }
    //    }

    //}

    public string runTest(string user)
    {
        try
        {
            //this.loginSteps.login_as(this.driver, user);
            //this.logoutSteps.logout(this.driver);
        }
        catch (Exception e)
        {
            Assert.Fail();
        }
        return "Pass";
    }

}

