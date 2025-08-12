import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack,
  Card,
  CardContent,
  Link,
  ListItem,
  List
} from '@mui/material';
import { useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TwitterIcon from '@mui/icons-material/Twitter';
import DescriptionIcon from '@mui/icons-material/Description';
import hairVideo from '../assets/hair-background.mp4';
import logoDiscord from "../assets/logo_discord.png";
import logoHair from '../assets/logo_hair_no_bg.png';
import hemiLogo from '../assets/hemi_logo.png';
import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip } from 'recharts';

const tokenomicsData = [
  { name: 'Maxwell Sanchez Airdrop', value: 49, color: '#DC2F02', text: "A one-time airdrop honoring the origin of the project and its iconic inspiration — Max's legendary hair." },
  { name: 'Community $Hairdrop', value: 8, color: '#E85D04', text: "Free distribution to active users, creators, and ambassadors in the community." },
  { name: 'Liquidity Providing', value: 35, color: '#F48C06', text: "Reserved for creating and strengthening liquidity pools on DEXs." },
  { name: 'Marketing & Development', value: 7, color: '#FAA307', text: "Funding for growth initiatives, partnerships, campaigns, and technical development." },
  { name: 'Team', value: 1, color: '#FFBA08', text: "A symbolic allocation for the core team to support the project's early phases." },
];

const quotes = [
  {
    text: "But how does Max manage to have such silky hair? 🤔",
    author: "Alix, probably jealous, during a MwM"
  },
  {
    text: "Max's hair is the real MVP of this project! 💪",
    author: "Community member"
  },
  {
    text: "I've never seen hair this legendary before! 👑",
    author: "Another impressed viewer"
  },
  {
    text: "This hair deserves its own token! 🚀",
    author: "Crypto enthusiast"
  },
  {
    text: "Max's hair game is stronger than Bitcoin! 💎",
    author: "Hair enthusiast"
  }
];

const roadmapSteps = [
  {
    date: "WEN ?",
    title: "[Done] The Birth of the Project",
    description: "A spontaneous joke about Maxwell Sanchez's silky hair during a Midweek with Max AMA triggered an unexpected surge of excitement. The idea of $HAIR Token emerged — from meme to movement."
  },
  {
    date: "WEN ?",
    title: "[Done] First Deployments",
    description: `Launch of the official website and Discord server\nDeployment of the token on the testnet\nFirst distributions to early community members\n"The Hairdresser" – AI Community Agent v1`
  },
  {
    date: "WEN ?",
    title: "[Done] Going Mainnet",
    description: "Déploiement du jeton sur le mainnet\nDéploiement des pools de liquidité\nAnnonce de partenariats\n"
  },
  {
    date: "WEN ?",
    title: "[On going] Community building",
    description: "Implementation of the incentive program (Hairdrop)\nDeployment of v2 of the website with a user dashboard\nEven more partnerships"
  },
  {
    date: "WEN ?",
    title: "[Soon] Governance and Decentralization",
    description: "Community debates on governance structure\nOpen forum for DAO proposal systems\nImplementation of the governance solution"
  },
  {
    date: "WEN ?",
    title: "[Soon] Fair Hairdrop Distribution",
    description: "This isn’t just a giveaway — it’s a symbolic act of appreciation for those who planted the seed of this movement. A fair, community-first approach to launch utility and governance into the hands of those who care.\nTreasury Control Shift\nMultisig wallets progressively handed over to elected stewards\nTransparent financial reporting\nCommunity take over."
  },
  {
    date: "WEN ?",
    title: "[Soon] Real-World Integration",
    description: "$HAIR is more than a memecoin — it’s a gateway to real-world impact."
  },
];

const HomePage = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4000); // Change quote every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', pt: 8 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 4 } }}>
        {/* Hero Section */}
        <Box 
          id="home" 
          sx={{ 
            position: 'relative',
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            mb: 8,
            mx: 'auto'
          }}
        >
          {/* Video Background */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
                zIndex: 1
              }
            }}
          >
            <Box
              component="video"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              sx={{
                width: { xs: '100%', md: '100%' },
                height: { xs: '100vh', md: '100%' },
                objectFit: 'cover',
                objectPosition: 'center center',
                transform: 'scale(1)',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            >
              <source src={hairVideo} type="video/mp4" />
            </Box>
          </Box>

          {/* Content Overlay */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              color: 'white',
              px: 2
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Luckiest Guy", "Bangers", "Montserrat", "Poppins", sans-serif',
                fontSize: { xs: '3rem', md: '5rem' },
                fontWeight: 900,
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                '& .max': {
                  color: 'white',
                  WebkitTextFillColor: 'white',
                },
                '& .token': {
                  color: '#FF6B35',
                  WebkitTextFillColor: '#FF6B35',
                }
              }}
            >
              <span className="max">MAX'S</span>{' '}
              <span className="token"> $HAIR TOKEN</span>
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Bangers", "Montserrat", "Poppins", sans-serif',
                fontSize: { xs: '1rem', md: '1.5rem' },
                m: 4,
                mb: 8,
                color: 'white',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.4,
                fontWeight: 400
              }}
            >
              $HAIR is the first memecoin on Hemi Network, inspired by Maxwell Sanchez's silky hair. Join a community that is transforming a simple Discord meme into a vehicle for real impact. $HAIR is proof that humor, culture, and technology can come together to redistribute value in a different way—to those who create, share, and engage.
            </Typography>

            <Box sx={{ 
              position: 'relative',
              backgroundColor: 'rgba(233, 212, 205, 0.2)',
              borderRadius: 2,
              p: 3,
              mb: 4,
              maxWidth: { xs: '100%', sm: '600px' },
              width: { xs: '100%', sm: 'auto' },
              mx: { xs: 0, sm: 'auto' },
              px: { xs: 0, sm: 3 },
              animation: 'float 3s ease-in-out infinite',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
                backgroundColor: 'rgba(233, 212, 205, 0.3)',
              },
              '@keyframes float': {
                '0%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-10px)' },
                '100%': { transform: 'translateY(0px)' },
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: '10px solid rgba(233, 212, 205, 0.2)'
              }
            }}>
              <Typography sx={{ 
                fontStyle: 'italic',
                color: 'white',
                textAlign: 'center',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                transition: 'opacity 0.5s ease-in-out',
                minHeight: '60px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <span style={{ fontStyle: 'italic', marginBottom: '8px' }}>
                  "{quotes[currentQuoteIndex].text}"
                </span>
                <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  - {quotes[currentQuoteIndex].author}
                </span>
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center">
              <Link 
                href="https://www.sushi.com/hemi/swap?token0=0x7A06C4AeF988e7925575C50261297a946aD204A8&token1=0x5B774f563C902FA7b203FB7029ed6eD4Ce274705&swapAmount=" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<RocketLaunchIcon sx={{ color: 'white' }} />}
                  sx={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FF8C42 0%, #FFB74D 100%)',
                    },
                    px: 4,
                    py: 1.5,
                    color: 'white',
                    '& .MuiButton-label': {
                      color: 'white'
                    }
                  }}
                >
                  Buy $HAIR NOW
                </Button>
              </Link>
              <Link 
                href="https://usdhair-max.gitbook.io/hairmaxtoken/getting-started/quickstart" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Setup Wallet
                </Button>
              </Link>
            </Stack>
          </Box>
        </Box>

        {/* About Section */}
        <Box id="about" sx={{
          mb: 8,
          pt: 2,
          animation: 'fadeInUp 0.8s ease-out',
          '@keyframes fadeInUp': {
            '0%': {
              opacity: 0,
              transform: 'translateY(30px)'
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)'
            }
          }
        }}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              fontFamily: '"Bangers", "Montserrat", "Poppins", sans-serif',
              fontWeight: 800,
              animation: 'slideInFromLeft 0.6s ease-out 0.2s both',
              '@keyframes slideInFromLeft': {
                '0%': {
                  opacity: 0,
                  transform: 'translateX(-50px)'
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateX(0)'
                }
              }
            }}
          >
            ABOUT $HAIR
          </Typography>
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 6,
              color: 'text.secondary',
              fontWeight: 700,
              fontFamily: '"Montserrat", "Poppins", sans-serif',
              animation: 'slideInFromRight 0.6s ease-out 0.4s both',
              '@keyframes slideInFromRight': {
                '0%': {
                  opacity: 0,
                  transform: 'translateX(50px)'
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateX(0)'
                }
              }
            }}
          >
            The meme that grew into something beautiful
          </Typography>

          <Card sx={{
            maxWidth: 800,
            mx: 'auto',
            p: 4,
            animation: 'scaleIn 0.8s ease-out 0.6s both',
            '@keyframes scaleIn': {
              '0%': {
                opacity: 0,
                transform: 'scale(0.9)'
              },
              '100%': {
                opacity: 1,
                transform: 'scale(1)'
              }
            }
          }}>
            {/* <Typography variant="h4" gutterBottom sx={{ color: '#FF6B35', mb: 3, fontFamily: '"Montserrat", "Poppins", sans-serif', fontWeight: 700 }}>
              FROM JOKE TO POW! TOKEN
            </Typography> */}

            <Typography paragraph sx={{ mb: 3, fontFamily: '"Poppins", "Roboto", "Arial", sans-serif', fontWeight: 400 }}>
              The $HAIR token originated as a recurring joke within the Hemi Network community, referring to the silky hair of Maxwell Sanchez, co-founder of Hemi Network. The joke gained popularity during weekly AMAs called "Midweek with Max," where community members began regularly commenting on the quality of his hair.
            </Typography>

            <Box sx={{ 
              borderLeft: '4px solid #FF6B35', 
              pl: 3, 
              py: 1, 
              mb: 3,
              fontStyle: 'italic',
              color: 'text.secondary',
              fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
            }}>
              "Have you seen Max's hair today? It's particularly voluminous!"
            </Box>

            <Typography paragraph sx={{ mb: 3, fontFamily: '"Poppins", "Roboto", "Arial", sans-serif', fontWeight: 400 }}>
              The craze surrounding this joke took on unexpected proportions when the community itself proposed creating a token inspired by the joke. And so the $HAIR Max token was born, symbolizing both the playful spirit and active involvement of the community in the Hemi Network ecosystem.
            </Typography>

            <Typography paragraph sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif', fontWeight: 400 }}>
              But as is often the case in Web3, what starts as a meme ends up taking on a life of its own...
            </Typography>

            <Typography paragraph sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif', fontWeight: 400 }}>
              But $HAIR is not just a meme, $HAIR is:
            </Typography>

            <Box sx={{ pl: 2 }}>
              <List dense sx={{ py: 0 }}>
                <ListItem><Typography sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif', fontWeight: 200, mb: 0 }}>- A community engagement tool</Typography></ListItem>
                <ListItem><Typography sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif', fontWeight: 200, mb: 0 }}>- A playground for creators</Typography></ListItem>
                <ListItem><Typography sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif', fontWeight: 200, mb: 0 }}>- An attempt at horizontal governance</Typography></ListItem>
                <ListItem><Typography sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif', fontWeight: 200, mb: 0 }}>- A space for relaxation and conviviality</Typography></ListItem>
                <ListItem><Typography sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif', fontWeight: 200, mb: 0 }}>- A value proposition integrating hair into an economic model that impacts the real economy</Typography></ListItem>
                <ListItem><Typography sx={{ pt: 3, fontFamily: '"Poppins", "Roboto", "Arial", sans-serif', fontWeight: 400, mb: 0 }}>Proof that you can build serious things without taking yourself too seriously !</Typography></ListItem>
              </List>
            </Box>

            <Box
              component="img"
              src={logoHair}
              alt="HAIR Logo"
              sx={{
                display: 'block',
                mx: 'auto',
                mt: 4,
                maxWidth: 220,
                width: '100%',
                height: 'auto',
                animation: 'wizz-rotate 1.5s infinite',
                '@keyframes wizz-rotate': {
                  '0%':   { transform: 'translate(0, 0) rotate(0deg)' },
                  '10%':  { transform: 'translate(-4px, 2px) rotate(-6deg)' },
                  '20%':  { transform: 'translate(4px, -2px) rotate(6deg)' },
                  '30%':  { transform: 'translate(-3px, 2px) rotate(-5deg)' },
                  '40%':  { transform: 'translate(3px, -1px) rotate(5deg)' },
                  '50%':  { transform: 'translate(-2px, 2px) rotate(-4deg)' },
                  '60%':  { transform: 'translate(2px, -2px) rotate(4deg)' },
                  '70%':  { transform: 'translate(-1px, 1px) rotate(-2deg)' },
                  '80%':  { transform: 'translate(1px, -1px) rotate(2deg)' },
                  '90%':  { transform: 'translate(0, 2px) rotate(0deg)' },
                  '100%': { transform: 'translate(0, 0) rotate(0deg)' },
                },
                transition: 'animation 0.8s',
                '&:hover': {
                  animation: 'wizz-rotate 0.8s infinite',
                },
              }}
            />
          </Card>
        </Box>

        {/* Hemi Section */}
        <Box id="hemi" sx={{ mb: 8, pt: 2 }}>
          {/* Titre + logo sur la même ligne */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mb: 2,
            flexWrap: 'wrap'
          }}>
            <Box
              component="img"
              src={hemiLogo}
              alt="Hemi Logo"
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Bangers", "Montserrat", "Poppins", sans-serif',
                fontWeight: 800,
                color: '#FF8C42',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                mb: 0
              }}
            >
              HEMI NETWORK
            </Typography>
          </Box>
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 4,
              color: 'text.secondary',
              fontWeight: 700,
              fontFamily: '"Montserrat", "Poppins", sans-serif'
            }}
          >
            The Programmable Bitcoin Chain
          </Typography>

          {/* Titre texte + description */}
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: '#FF6B35',
              fontFamily: '"Montserrat", "Poppins", sans-serif',
              fontWeight: 700,
              mb: 2
            }}
          >
            Scaling Bitcoin Beyond Money
          </Typography>
          <Typography
            align="center"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              mb: 6,
              fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
              fontSize: { xs: '1rem', md: '1.15rem' }
            }}
          >
            Hemi is <b>The Programmable Bitcoin chain</b> — a modular network for superior BTC scaling, security, and DeFi interoperability — all powered by Bitcoin and Ethereum.
          </Typography>

          {/* 4 Cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
              gap: 4,
              mb: 4,
              height: { xs: 'auto', md: 320 },
              alignItems: 'stretch',
            }}
          >
            {/* Card 1 */}
            <Card sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Box
                component="img"
                src={hemiLogo}
                alt="hVM"
                sx={{ width: 48, height: 48, mx: 'auto', mb: 2, borderRadius: '50%' }}
              />
              <Typography variant="h5" sx={{ color: '#FF6B35', fontWeight: 700, mb: 1 }}>
                HEMI VIRTUAL MACHINE
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }}>
                The hVM incorporates a full Bitcoin node within an Ethereum Virtual Machine, providing developers with a familiar programming interface while harnessing the power of both Bitcoin and Ethereum.
              </Typography>
            </Card>
            {/* Card 2 */}
            <Card sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Box
                component="img"
                src={hemiLogo}
                alt="hBK"
                sx={{ width: 48, height: 48, mx: 'auto', mb: 2, borderRadius: '50%' }}
              />
              <Typography variant="h5" sx={{ color: '#FF6B35', fontWeight: 700, mb: 1 }}>
                BITCOIN PROGRAMMABILITY
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }}>
                Building with the Hemi Bitcoin Kit (hBK) provides smart contracts with highly granular indexed views of Bitcoin state, unlocking Bitcoin DeFi applications that were previously impractical or impossible.
              </Typography>
            </Card>
            {/* Card 3 */}
            <Card sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Box
                component="img"
                src={hemiLogo}
                alt="Superfinality"
                sx={{ width: 48, height: 48, mx: 'auto', mb: 2, borderRadius: '50%' }}
              />
              <Typography variant="h5" sx={{ color: '#FF6B35', fontWeight: 700, mb: 1 }}>
                BITCOIN SUPERFINALITY
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }}>
                Hemi's Proof-of-Proof (PoP) consensus mechanism ensures transactions surpass Bitcoin's level of security in just a few hours, providing unmatched reliability for your assets.
              </Typography>
            </Card>
            {/* Card 4 */}
            <Card sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Box
                component="img"
                src={hemiLogo}
                alt="Cross-chain"
                sx={{ width: 48, height: 48, mx: 'auto', mb: 2, borderRadius: '50%' }}
              />
              <Typography variant="h5" sx={{ color: '#FF6B35', fontWeight: 700, mb: 1 }}>
                CROSS-CHAIN PORTABILITY
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }}>
                The hVM's unique awareness of Bitcoin's and Ethereum's states enables secure, seamless asset transfers between Hemi and other chains through its "Tunnels" feature.
              </Typography>
            </Card>
          </Box>

          {/* Citation finale */}
          <Typography align="center" sx={{ fontStyle: 'italic', color: '#FF6B35', fontSize: '1.1rem', mt: 2 }}>
            "$HAIR is the first memecoin on Hemi Network, bringing the fun and community spirit to this powerful blockchain infrastructure!"
          </Typography>
        </Box>

        {/* Tokenomics Section */}
        <Box id="tokenomics" sx={{ 
          mb: 8, 
          pt: 2,
          animation: 'fadeInUp 0.8s ease-out',
          '@keyframes fadeInUp': {
            '0%': {
              opacity: 0,
              transform: 'translateY(30px)'
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)'
            }
          }
        }}>
          <Typography variant="h2" align="center" gutterBottom sx={{
            animation: 'slideInFromLeft 0.6s ease-out 0.2s both',
            '@keyframes slideInFromLeft': {
              '0%': {
                opacity: 0,
                transform: 'translateX(-50px)'
              },
              '100%': {
                opacity: 1,
                transform: 'translateX(0)'
              }
            }
          }}>
            TOKENOMIC
          </Typography>
          <Typography variant="h3" align="center" sx={{ mb: 6, color: 'text.secondary', fontWeight: 700, fontFamily: '"Montserrat", "Poppins", sans-serif' }}>
            A well-balanced distribution for healthy growth
          </Typography>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 0, md: 12 },
            mb: 4
          }}>
            {/* Card 1 */}
            <Card sx={{ minWidth: "100%", p: 3, mb: { xs: 4, md: 0 } }}>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#FF6B35' }}>
                $HAIR Token
              </Typography>
              {tokenomicsData.map((entry, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, borderRadius: 2, bgcolor: entry.color, color: 'white', fontWeight: 700 }}>
                  {entry.value}% {entry.name}
                </Box>
              ))}
            </Card>

            {/* Pie Chart */}
            <Box sx={{ 
              width: "100%", 
              height: "100%",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tokenomicsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={160}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={1}
                    label={false}
                  >
                    {tokenomicsData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        style={{ 
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      fontSize: '14px'
                    }}
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(5, 1fr)' },
              gap: 4,
              mb: 4,
            }}
          >
            {tokenomicsData.map((entry, index) => (
              <Card key={index} sx={{ p: 3, textAlign: 'center', minHeight: 220 }}>
                <Typography variant="h5" sx={{ color: entry.color, fontWeight: 700, mb: 1 }}>
                  {entry.name}
                </Typography>
                <Typography variant="h3" sx={{ color: entry.color, fontWeight: 900, mb: 2 }}>
                  {entry.value}%
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }}>
                  {entry.text}
                </Typography>
              </Card>
            ))}
          </Box>

        </Box>

        {/* Roadmap Section */}
        <Box id="roadmap" sx={{ mb: 8, pb: 4, pt: 2, animation: 'fadeInUp 0.8s ease-out', '@keyframes fadeInUp': { '0%': { opacity: 0, transform: 'translateY(30px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } } }}>
          <Typography variant="h2" align="center" gutterBottom sx={{ animation: 'slideInFromLeft 0.6s ease-out 0.2s both', '@keyframes slideInFromLeft': { '0%': { opacity: 0, transform: 'translateX(-50px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } } }}>
            ROADMAP
          </Typography>
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 6,
              color: 'text.secondary',
              fontWeight: 700,
              fontFamily: '"Montserrat", "Poppins", sans-serif'
            }}
          >
            The cool stuff we want to do on our route
          </Typography>

          <Box
            sx={{
              position: 'relative',
              maxWidth: 800,
              mx: 'auto',
              px: 4,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: 4,
                bgcolor: '#FF6B35',
                zIndex: 0,
                borderRadius: 2,
                transform: 'translateX(-50%)'
              }
            }}
          >
            {roadmapSteps.map((step, idx) => (
              <Box
                key={idx}
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  '&:last-child': {
                    mb: 0
                  }
                }}
              >
                {/* Card - Left for even indices, right for odd indices */}
                {idx % 2 === 0 ? (
                  <Box
                    sx={{
                      background: 'background.paper',
                      borderRadius: 3,
                      p: 2,
                      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                      minHeight: 120,
                      width: '45%',
                      textAlign: 'center',
                      border: '2px solid #FF6B35',
                      position: 'relative',
                      mr: 3,
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        right: '-16px',
                        transform: 'translateY(-50%)',
                        borderWidth: '8px',
                        borderStyle: 'solid',
                        borderColor: 'transparent transparent transparent',
                        borderLeftColor: 'background.paper',
                        zIndex: 1,
                      }
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#FF6B35', mb: 1 }}>
                      {step.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontFamily: '"Poppins", "Roboto", "Arial", sans-serif', fontSize: '0.98rem' }}>
                      {step.description.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < step.description.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </Typography>
                  </Box>
                ) : null}

                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    bgcolor: '#FF6B35',
                    border: '4px solid',
                    borderColor: 'background.paper',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: 'white',
                    fontSize: '1.1rem',
                    position: 'absolute',
                    left: idx % 2 === 0 ? 'auto' : '50%',
                    right: idx % 2 === 0 ? '50%' : 'auto',
                    transform: idx % 2 === 0 ? 'translateX(50%)' : 'translateX(-50%)',
                    zIndex: 3,
                  }}
                />

                <Box sx={{ position: 'absolute', left: idx % 2 === 0 ? '65%' : '35%', transform: 'translateX(-50%)', zIndex: 3 }}>
                  <Typography sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    {step.date}
                  </Typography>
                </Box>

                {/* Card - Right for odd indices */}
                {idx % 2 === 1 ? (
                  <Box
                    sx={{
                      background: 'background.paper',
                      borderRadius: 3,
                      p: 3,
                      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                      minHeight: 120,
                      width: '45%',
                      textAlign: 'center',
                      border: '2px solid #FF6B35',
                      position: 'relative',
                      ml: 'auto',
                      mr: 0,
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '-16px',
                        transform: 'translateY(-50%)',
                        borderWidth: '8px',
                        borderStyle: 'solid',
                        borderColor: 'transparent',
                        borderRightColor: 'background.paper',
                        zIndex: 1,
                      }
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#FF6B35', mb: 1 }}>
                      {step.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontFamily: '"Poppins", "Roboto", "Arial", sans-serif', fontSize: '0.98rem' }}>
                      {step.description.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < step.description.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </Typography>
                  </Box>
                ) : null}
              </Box>
            ))}
          </Box>
          <Box sx={{ 
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
              mt: 6,
              p: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 107, 53, 0.05)',
              border: '1px solid rgba(255, 107, 53, 0.2)'
            }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Montserrat", "Poppins", sans-serif',
                  fontWeight: 600,
                  color: '#FF6B35',
                  mb: 2
                }}
              >
                The Future is in Your Hands
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  mb: 2
                }}
              >
                Once the DAO is fully active, the community will have full control over the future of $HAIR.
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary', 
                  fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
                  fontSize: '1rem',
                  lineHeight: 1.6
                }}
              >
                From funding external partnerships to supporting charities, research initiatives, or social good campaigns — the power lies with the holders.
              </Typography>
            </Box>
        </Box>

        {/* CTA Section */}
        <Card sx={{ mb: 8, overflowX: 'auto', pb: 4, textAlign: 'center' }}>
          <CardContent sx={{ py: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ 
              fontFamily: '"Bangers", "Montserrat", "Poppins", sans-serif',
              fontWeight: 800,
              color: '#FF6B35',
              mb: 3
            }}>
              Ready to Join the $HAIR Revolution?
            </Typography>
            <Typography color="text.secondary" paragraph sx={{ 
              mb: 4,
              fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
              fontSize: '1.1rem'
            }}>
              Connect your wallet and become part of the most magnificent memecoin community on Hemi Network!
            </Typography>
            
            {/* Social Media Buttons */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              justifyContent="center" 
              alignItems="center"
              sx={{ mb: 4 }}
            >
              {/* Twitter/X Button */}
              <Link 
                href="https://twitter.com/hairmaxtoken" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<TwitterIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #1DA1F2 0%, #0D8BD9 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0D8BD9 0%, #0A6BC7 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(29, 161, 242, 0.3)',
                    },
                    px: 4,
                    py: 1.5,
                    color: 'white',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                    minWidth: 180,
                  }}
                >
                  Follow on X
                </Button>
              </Link>

              {/* Discord Button */}
              <Link 
                href="https://discord.gg/xeeVpy7Whk" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Box 
                    component="img"
                    src={logoDiscord}
                    sx={{
                      width: 24,
                      height: 24,
                    }}
                  />}
                  sx={{
                    background: 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4752C4 0%, #3C45A5 100%)',
                      transform: 'translateY(-2px)', 
                      boxShadow: '0 8px 25px rgba(88, 101, 242, 0.3)',
                    },
                    px: 4,
                    py: 1.5,
                    color: 'white',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                    minWidth: 180,
                  }}
                >
                  Discord
                </Button>
              </Link>

              {/* Telegram Button */}
              {/* <Link 
                href="https://t.me/hairmaxtoken" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<TelegramIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #0088CC 0%, #0077B3 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0077B3 0%, #006699 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 136, 204, 0.3)',
                    },
                    px: 4,
                    py: 1.5,
                    color: 'white',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                    minWidth: 180,
                  }}
                >
                  Telegram
                </Button>
              </Link> */}

              {/* Documentation Button */}
              <Link 
                href="https://usdhair-max.gitbook.io/hairmaxtoken/" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<DescriptionIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FF8C42 0%, #FFB74D 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)',
                    },
                    px: 4,
                    py: 1.5,
                    color: 'white',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                    minWidth: 180,
                  }}
                >
                  Documentation
                </Button>
              </Link>
            </Stack>

            {/* Buy Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link 
                href="https://www.sushi.com/hemi/swap?token0=0x7A06C4AeF988e7925575C50261297a946aD204A8&token1=0x5B774f563C902FA7b203FB7029ed6eD4Ce274705&swapAmount=" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FF8C42 0%, #FFB74D 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)',
                    },
                    px: 6,
                    py: 2,
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Buy $HAIR Now
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Container>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          mt: 8,
          pt: 4,
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 3
          }}>
            {/* Logo and Description */}
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: 300 }}>
              <Box
                component="img"
                src={logoHair}
                alt="HAIR Logo"
                sx={{
                  height: 60,
                  mb: 2
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                The first memecoin on Hemi Network, inspired by Maxwell Sanchez's legendary silky hair.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                © 2024 $HAIR Token. All rights reserved.
              </Typography>
            </Box>

            {/* Quick Links */}
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Link 
                  href="https://usdhair-max.gitbook.io/hairmaxtoken/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  Documentation
                </Link>
                <Link 
                  href="https://www.sushi.com/hemi/swap?token0=0x7A06C4AeF988e7925575C50261297a946aD204A8&token1=0x5B774f563C902FA7b203FB7029ed6eD4Ce274705&swapAmount=" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  Buy $HAIR
                </Link>
                <Link 
                  href="https://testnet.explorer.hemi.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  Explorer
                </Link>
              </Stack>
            </Box>

            {/* Social Links */}
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>
                Community
              </Typography>
              <Stack spacing={1}>
                <Link 
                  href="https://twitter.com/hairmaxtoken" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  Twitter / X
                </Link>
                <Link 
                  href="https://discord.gg/xeeVpy7Whk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  Discord
                </Link>
                <Link 
                  href="https://t.me/hairmaxtoken" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  Telegram
                </Link>
              </Stack>
            </Box>

            {/* Network Info */}
            {/* <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>
                Network
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Hemi Sepolia Testnet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Chain ID: 743111
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Powered by Bitcoin
                </Typography>
              </Stack>
            </Box> */}
          </Box>

          {/* Bottom Bar */}
          <Box sx={{ 
            pt: 1, 
            borderTop: '1px solid', 
            borderColor: 'divider',
            textAlign: 'center'
          }}>
            <Typography variant="caption" color="text.secondary">
              Built with ❤️ on Hemi Network By HairMaxTeam - The Programmable Bitcoin Chain
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 