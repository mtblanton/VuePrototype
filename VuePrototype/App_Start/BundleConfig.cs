using System.Web;
using System.Web.Optimization;

namespace VuePrototype
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/vue").Include(
                    "~/Scripts/vue.js",
                    "~/Scripts/common.js",
                    "~/Scripts/popper.js",
                    "~/Scripts/tooltip.js",
                    "~/Scripts/v-tooltip.js",
                    "~/Scripts/label-checkbox.js",
                    "~/Scripts/label-input.js",
                    "~/Scripts/label-select.js",
                    "~/Scripts/v-address.js"
                ));
            bundles.Add(new ScriptBundle("~/bundles/GroupShell").Include(
                    "~/Scripts/GroupShell.js"
                ));
        }
    }
}
