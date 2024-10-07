import img from  '../../assets/homescreenfooter.webp'

const Footer = () => {
    return (
        <div>
           <footer className="footer bg-[#5a5a5a] text-white p-10">
  <aside>
    <h2 className=" text-2xl font-bold">About Bangladeshi Matrimony</h2>
    <p className="w-96 text-base">
    BangladeshiMatrimony.com is the No.1 most trusted  matrimony site for Bangladeshi brides and grooms. Lakhs of  members have successfully found their life  partners here!  Browse through our vast selection of profiles  from all Religions
    </p>
  </aside>
  <nav className="text-base">
    <h6 className="text-2xl font-bold">Help & Support</h6>
    <a className="link link-hover">Live help</a>
    <a className="link link-hover">Contract Us</a>
    <a className="link link-hover">Feedback</a>
    <a className="link link-hover">FAQS</a>
  </nav>
  <nav className="text-base">
    <h6 className="text-2xl font-bold">Quick Links</h6>
    <a className="link link-hover">Upgrade</a>
    <a className="link link-hover">Safe Matrimony</a>
    <a className="link link-hover">Popular Matrimony search</a>
    <a className="link link-hover">Teams, Condition & Refund Policy</a>
    <a className="link link-hover">Privacy Policy</a>
  </nav>
</footer>
<footer className="footer text-base mb-2  bg-[#5a5a5a] text-white p-5">
  <aside>
    <p className="w-[720px] px-5 font-normal"> BangladeshiMatrimony is part of Globalmatrimony.com | Copyright © {new Date().getFullYear()} - All rights reserved.
    This website is strictly for matrimony purpose only and not a dating website
</p>
<div className='px-5 my-10'>
<img className='bg-white w-[700px]' src={img} alt="" />
</div>
  </aside>
</footer>
        </div>
    );
};

export default Footer;