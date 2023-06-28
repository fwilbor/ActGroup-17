import logo from '../assets/logo.png';
import splashImage from '../assets/robot.gif';
import Navbar from './Navbar';

const Splash = () => {
  return (
    <div style={{ 
      backgroundColor: '#FFF',
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      padding: '10px 0',
      maxWidth: '1920px',
      margin: '0 auto',
    }}>
      <div style={{ 
        maxWidth: '1000px', 
        textAlign: 'center',
      }}>
        <Navbar/>
        <div style={{ display: 'block', alignItems: 'center', marginBottom: '50px' }}>
          <img 
            src={splashImage} 
            alt="Splash Image" 
            style={{ 
              maxWidth: '50%',
              marginRight: '20px',
              float:'right',
              width: '322px',
              height: '350px',
            }}
          />
          <h1 style={{ 
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '30px',
          }}>Welcome to KidzSnap</h1>
        </div>
        <p style={{ 
          fontSize: '18px',
          lineHeight: '1.5',
          marginBottom: '30px',
        }}>
          KidzSnap is a secure platform designed to help solve the problem of online safety for children. It provides a solution to the challenges faced by parents and guardians in today's digital age by giving them the tools to monitor and control their children's online activity.
          <br /><br />
          KidzSnap collects less personal information than other platforms and provides a monitored environment for children to learn about social media. It gives parents access to data that lets them see the time their child spends online, their friends list, and flagged messages.
          <br /><br />
          The platform also includes features that educate users about best practices for online safety. By educating both parents and children, KidzSnap helps reduce the risk of harm and promote responsible online behavior.
        </p>
        <div>
          <h1>Cybersecurity and Internet Safety</h1>
          <p>As a parent, it is important to educate yourself on cybersecurity and protecting your children on the internet. Here are some resources to help you get started:</p>
          <ul style={{ listStylePosition: 'inside' }}>
            <li><a href="https://www.consumer.ftc.gov/topics/protecting-kids-online">FTC: Protecting Kids Online</a></li>
            <li><a href="https://www.connectsafely.org/">ConnectSafely</a></li>
            <li><a href="https://www.commonsensemedia.org/">Common Sense Media</a></li>
          </ul>
          <p>It is also important to educate your children on internet safety. Here are some resources that can help:</p>
          <ul style={{ listStylePosition: 'inside' }}>
            <li><a href="https://www.missingkids.org/netsmartz/home">NetSmartz</a></li>
            <li><a href="https://www.kidshealth.org/en/parents/net-safety.html">KidsHealth: Internet Safety</a></li>
            <li><a href="https://www.commonsensemedia.org/blog/parents-ultimate-guide-to-parental-controls">Common Sense Media: Parental Controls Guide</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Splash;