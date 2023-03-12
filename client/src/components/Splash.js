import logo from '../assets/logo.png';
import splashImage from '../assets/robot.gif';

const Splash = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <img src={splashImage} alt="Splash Image" style={{ width: '90%', height: '90%' }}/>
      <div style={{ padding: '0 50px' }}>
        <img src={logo} alt="Company Logo" style={{ width: '40%', height: '40%', alignItems:'center', justifyContent: 'center'}} />
        <p>KidzSnap is a secure platform designed to help solve the problem of online safety for children. It provides a solution to the challenges faced by parents and guardians in today's digital age by giving them the tools to monitor and control their children's online activity. KidzSnap collects less personal information than other platforms and provides a monitored environment for children to learn about social media. It gives parents access to data that lets them see the time their child spends online, their friends list, and flagged messages. This information helps parents stay informed about what their children are doing online and who they are interacting with, allowing them to address any potential dangers or concerns. The platform also includes features that educate users about best practices for online safety. For example, it provides tips and resources on how to avoid cyber bullying, how to protect personal information, and how to recognize and report inappropriate content. By educating both parents and children, KidzSnap helps reduce the risk of harm and promote responsible online behavior.</p>
        <p>KidzSnap also incorporates robust security measures to ensure the safety of its users. The platform is built using secure technologies and follows best practices for data privacy and protection. This helps ensure that children's personal information and online activity are kept safe from potential threats.</p>
        <p>Overall, KidzSnap offers a comprehensive solution to the problem of online safety for children. By giving parents the tools to monitor and control their children's online activity and educating both parents and children on best practices for online safety, KidzSnap helps reduce the risks associated with technology and promote a safer and more responsible online experience for children.</p>
      </div>
    </div>
  );
};

export default Splash;