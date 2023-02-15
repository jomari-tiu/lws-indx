import React from "react";
import { AnimateContainer, PageContainer } from "../components/animation";
import Image from "next/image";
import { Button } from "../components/Button";
import { Input as Inp } from "antd";
import { FaFacebookF } from "react-icons/fa";
import { GrMenu } from "react-icons/gr";
import { Drawer } from "antd";
import { twMerge } from "tailwind-merge";
import { fadeIn } from "../components/animation/animation";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import Layout from "../layout";

type sideMenuProps = {
  label: string;
  link: string;
  appearance: string;
};

const menu: Array<sideMenuProps> = [
  {
    label: "About Indx",
    link: "#about",
    appearance: "link",
  },
  {
    label: "Contact Us",
    link: "#contact-us",
    appearance: "link",
  },
  {
    label: "Register Now",
    link: "/registration",
    appearance: "primary",
  },
];

const privacyPolicy = `<ol style="list-style-type: decimal; list-style-position: inside;">
<li><span style="color: #1f4c80;"><strong>Introduction</strong></span><br /><br />Welcome to Lightweight Global Tech Solutions Corp.<br />Lightweight Global Tech Solutions Corp. (&ldquo;us&rdquo;, &ldquo;we&rdquo;, or &ldquo;our&rdquo;) operates indxhealth.com (hereinafter referred to as &ldquo;Service&rdquo;).<br />Our Privacy Policy governs your visit to www.indxhealth.com, and explains how we collect, safeguard and disclose information that results from your use of our Service. We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions. Our Terms and Conditions (&ldquo;Terms&rdquo;) govern all use of our Service and together with the Privacy Policy constitutes your agreement with us (&ldquo;agreement&rdquo;).<br /><br /></li>
<li><span style="color: #1f4c80;"><strong>Definitions</strong></span><br /><br />
<p>SERVICE means the indxhealth.com website operated by Lightweight Global Tech Solutions Corp..</p>
<p>PERSONAL DATA means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).</p>
<p>USAGE DATA is data collected automatically either generated by the use of Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
<p>COOKIES are small files stored on your device (computer or mobile device).</p>
<p>DATA CONTROLLER means a natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.</p>
<p>DATA PROCESSORS (OR SERVICE PROVIDERS) means any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.</p>
<p>DATA SUBJECT is any living individual who is the subject of Personal Data.</p>
<p>THE USER is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.</p>
</li>
<li><span style="color: #1f4c80;"><strong>Information Collection and Use </strong></span><br /><br />We collect several different types of information for various purposes to provide and improve our Service to you.<br /><br /></li>
<li><span style="color: #1f4c80;"><strong>Types of Data Collected<br /><br />Personal Data</strong></span><br /><br />While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (&ldquo;Personal Data&rdquo;). Personally identifiable information may include, but is not limited to:<br />0.1. Email address<br />0.2. First name and last name<br />0.3. Phone number<br />0.4. Address, Country, State, Province, ZIP/Postal code, City<br />0.5. Cookies and Usage Data<br />We may use your Personal Data to contact you with newsletters, marketing or promotional materials, and other information that may be of interest to you. You may opt-out of receiving any, or all, of these communications from us by following the unsubscribe link.<br /><br /><span style="color: #1f4c80;"><strong>Usage Data<br /></strong></span><br />
<p>We may also collect information that your browser sends whenever you visit our Service or when you access Service by or through any device (&ldquo;Usage Data&rdquo;).</p>
<p>This Usage Data may include information such as your computer&rsquo;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
<p>When you access Service with a device, this Usage Data may include information such as the type of device you use, your device unique ID, the IP address of your device, your device operating system, the type of Internet browser you use, unique device identifiers and other diagnostic data.</p>
<br /><span style="color: #1f4c80;"><strong>Usage Data</strong></span><br /><br />While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (&ldquo;Personal Data&rdquo;). Personally identifiable information may include, but is not limited to:<br />0.1. Email address<br />0.2. First name and last name<br />0.3. Phone number<br />0.4. Address, Country, State, Province, ZIP/Postal code, City<br />0.5. Cookies and Usage Data<br />We may use your Personal Data to contact you with newsletters, marketing or promotional materials, and other information that may be of interest to you. You may opt-out of receiving any, or all, of these communications from us by following the unsubscribe link.<br /><br /><span style="color: #1f4c80;"><strong>Tracking Cookies Data</strong></span><br /><br />
<p>We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information.</p>
<p>Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags, and scripts to collect and track information and to improve and analyze our Service.</p>
<p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.<br />Examples of Cookies we use:<br />0.1. Session Cookies: We use Session Cookies to operate our Service.<br />0.2. Preference Cookies: We use Preference Cookies to remember your preferences and various settings.<br />0.3. Security Cookies: We use Security Cookies for security purposes.<br />0.4. Advertising Cookies: Advertising Cookies are used to serve you with advertisements that may be relevant to you and your interests.</p>
<br /><span style="color: #1f4c80;"><strong>Other Data</strong></span><br /><br />While using our Service, we may also collect the following information: sex, age, date of birth, place of birth, passport details, citizenship, registration at the place of residence and actual address, telephone number (work, mobile), details of documents on education, qualification, professional training, employment agreements, NDA agreements, information on bonuses and compensation, information on marital status, family members, social security (or other taxpayer identification) number, office location, and other data.<br /><br /></li>
<li><span style="color: #1f4c80;"><strong>Use of Data</strong></span><br /><br />Lightweight Global Tech Solutions Corp. uses the collected data for various purposes:<br />0.1. to provide and maintain our Service;<br />0.2. to notify you about changes to our Service;<br />0.3. to allow you to participate in interactive features of our Service when you choose to do so;<br />0.4. to provide customer support;<br />0.5. to gather analysis or valuable information so that we can improve our Service;<br />0.6. to monitor the usage of our Service;<br />0.7. to detect, prevent and address technical issues;<br />0.8. to fulfill any other purpose for which you provide it;<br />0.9. to carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection;<br />0.10. to provide you with notices about your account and/or subscription, including expiration and renewal notices, email instructions, etc.;<br />0.11. to provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information;<br />0.12. in any other way we may describe when you provide the information;<br />0.13. for any other purpose with your consent.<br /><br /></li>
<li><span style="color: #1f4c80;"><strong>Retention of Data</strong></span><br /><br />We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.<br />We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.<br /><br /></li>
<li><span style="color: #1f4c80;"><strong>Transfer of Data</strong></span><br /><br />
<p>Your information, including Personal Data, may be transferred to &ndash; and maintained on &ndash; computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.</p>
<p>If you are located outside the Philippines and choose to provide information to us, please note that we transfer the data, including Personal Data, to the Philippines and process it there.<br />Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
<p>Lightweight Global Tech Solutions Corp. will take all the steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</p>
</li>
<li><span style="color: #1f4c80;"><strong>Disclosure of Data</strong></span><br /><br />
<p>We may disclose personal information that we collect, or you provide:</p>
<p>0.1. <strong>Disclosure for Law Enforcement.</strong><br />Under certain circumstances, we may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities.</p>
<p>0.2. <strong>Business Transaction.</strong><br />If we or our subsidiaries are involved in a merger, acquisition or asset sale, your Personal Data may be transferred.</p>
<p>0.3. <strong>Other cases. We may disclose your information also:</strong></p>
<p>0.3.1. to our subsidiaries and affiliates;</p>
<p>0.3.2. to contractors, service providers, and other third parties we use to support our business;</p>
<p>0.3.3. to fulfill the purpose for which you provide it;</p>
<p>0.3.4. for the purpose of including your company&rsquo;s logo on our website;</p>
<p>0.3.5. for any other purpose disclosed by us when you provide the information;</p>
<p>0.3.6. with your consent in any other cases;</p>
<p>0.3.7. if we believe disclosure is necessary or appropriate to protect the rights, property, or safety of the Company, our customers, or others.</p>
</li>
<li><span style="color: #1f4c80;"><strong>Security of Data<br /></strong></span><br />The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.<br /><br /></li>
<li><span style="color: #1f4c80;"><strong>Service Providers</strong></span><br /><br />We may employ third-party companies and individuals to facilitate our Service (&ldquo;Service Providers&rdquo;), provide Service on our behalf, perform Service-related services or assist us in analyzing how our Service is used.<br />These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.<br /><br /></li>
<li><span style="color: #1f4c80;"><strong>Analytics</strong></span><br /><br />We may use third-party Service Providers to monitor and analyze the use of our Service.<br /><br /></li>
<li><span style="color: #1f4c80;"><strong>CI/CD tools</strong></span><br /><br />We may use third-party Service Providers to automate the development process of our Service.<br /><br /></li>
<li><span style="color: #1f4c80;"><strong>Behavioral Remarketing</strong></span><br /><br />We may use remarketing services to advertise on third-party websites to you after you visited our Service. We and our third-party vendors use cookies to inform, optimize and serve ads based on your past visits to our Service.<br /><br /></li>
<li><span style="color: #1f4c80;"><strong>Links to Other Sites</strong></span><br /><br />Our Service may contain links to other sites that are not operated by us. If you click a third-party link, you will be directed to that third party&rsquo;s site. We strongly advise you to review the Privacy Policy of every site you visit.<br />We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.<br /><br /></li>
<li><span style="color: #1f4c80;"><strong>Children&rsquo;s Privacy</strong></span><br /><br />
<p>Our Services are not intended for use by children under the age of 18 (&ldquo;Child&rdquo; or &ldquo;Children&rdquo;).</p>
<p>We do not knowingly collect personally identifiable information from children under 18. If you become aware that a Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from Children without verification of parental consent, we take steps to remove that information from our servers.<br /><br /></p>
</li>
<li><span style="color: #1f4c80;"><strong>Changes to This Privacy Policy</strong></span><br /><br />
<p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
<p>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update &ldquo;effective date&rdquo; at the top of this Privacy Policy.</p>
<p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.<br /><br /></p>
</li>
<li><span style="color: #1f4c80;"><strong>Contact Us</strong></span><br /><br />If you have any questions about this Privacy Policy, please contact us by email: <a href="mailto:info@lightweightsolutions.me">info@lightweightsolutions.me</a></li>
</ol>`;

export default function PrivacyPolicy({ router }: any) {
  let [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  let [isHeaderActive, setIsHeaderActive] = React.useState(false);

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        closable={false}
        className="[&>.ant-drawer-content-wrapper]:max-xs:!w-full md:hidden"
      >
        <div className="flex flex-col flex-auto bg-white shadow-lg w-full h-full py-8">
          <div className="space-y-8 flex flex-col flex-1 relative">
            <div className="items-center h-12 w-full relative">
              <Image
                src="/images/logo.png"
                alt="random pics"
                fill
                sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
                className="object-center object-contain cursor-pointer"
                onClick={() => router.push("#hero")}
              />
            </div>
            <div className="flex flex-col flex-auto overflow-auto relative space-y-8 p-4">
              {menu.map(({ link, label, appearance }, index) => {
                return (
                  <Button
                    appearance={appearance}
                    key={index}
                    onClick={() => {
                      router.push(link);
                      setIsDrawerOpen(false);
                    }}
                    className={appearance !== "link" ? "p-4" : ""}
                  >
                    {label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </Drawer>
      <Layout>
        <div
          className={twMerge(
            "fixed top-0 left-0 flex justify-between items-center py-4 px-[5%] w-full z-50 transition mr-6 duration-300",
            isHeaderActive ? "bg-white shadow-md" : "bg-transparent"
          )}
        >
          <div className="items-center h-16 w-32 relative">
            <Image
              src="/images/logo.png"
              alt="random pics"
              fill
              sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
              className="object-center object-contain cursor-pointer"
              onClick={() => router.push("#hero")}
            />
          </div>
          <div className="hidden md:flex gap-20 items-center">
            {menu.map(({ label, link, appearance }, index) => (
              <div key={index}>
                <Button
                  appearance={appearance}
                  className={twMerge(
                    "text-[1.1rem]",
                    appearance !== "link" ? "p-4" : ""
                  )}
                  onClick={() => {
                    router.push(link);
                  }}
                >
                  {label}
                </Button>
              </div>
            ))}
          </div>
          <div className="block md:hidden">
            <Button
              appearance="link"
              className="text-2xl"
              onClick={() => setIsDrawerOpen(true)}
            >
              <GrMenu />
            </Button>
          </div>
        </div>
        <PageContainer
          className="!p-0 text-base bg-white text-default-secondary"
          onScroll={(e: any) => {
            if (
              e.target.scrollHeight - e.target.scrollTop <
              e.target.scrollHeight - 200
            ) {
              setIsHeaderActive(true);
            } else {
              setIsHeaderActive(false);
            }
          }}
        >
          <div className="p-[5%] pt-[8rem]">
            <h2 className="text-blumine text-center mb-8">Privacy Policy</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: privacyPolicy,
              }}
            />
          </div>
          <AnimateContainer variants={fadeIn} rootMargin="0px 0px">
            <div className="p-8 pt-0 flex justify-center items-center gap-8 flex-none !mt-4 !m-0">
              <Button
                appearance="link"
                className="text-3xl bg-primary p-4 rounded-full text-white hover:text-primary-300"
                onClick={() =>
                  window.open("https://www.facebook.com/indxhealth", "_blank")
                }
              >
                <FaFacebookF />
              </Button>
              <Button
                appearance="link"
                className="text-3xl bg-primary p-4 rounded-full text-white hover:text-primary-300"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/company/indx-health/?viewAsMember=true&original_referer=",
                    "_blank"
                  )
                }
              >
                <BsLinkedin />
              </Button>
              <Button
                appearance="link"
                className="text-3xl bg-primary p-4 rounded-full text-white hover:text-primary-300"
                onClick={() =>
                  window.open("https://www.instagram.com/indxhealth/", "_blank")
                }
              >
                <BsInstagram />
              </Button>
            </div>
          </AnimateContainer>
          <AnimateContainer
            variants={fadeIn}
            rootMargin="0px 0px"
            className="!m-0"
          >
            <div className="text-white bg-primary p-4 text-center !m-0">
              ©2022 Copyright | INDX Dental
            </div>
          </AnimateContainer>
        </PageContainer>
      </Layout>
    </>
  );
}
