import {styled } from "@mui/material";
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid'

export const HeadingFont = styled(Typography)(({ theme }) => ({
  fontSize: "2rem", // Default for xs
  
  [theme.breakpoints.up("sm")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "3.5rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "3.5rem",
  },
  fontWeight: 700, // Ensures bold headline
  lineHeight: 1.2, // Improves spacing
}));


export const HeadingFontSmall = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem", // Default for xs

  [theme.breakpoints.up("sm")]: {
    fontSize: "2.2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.7rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "3.2rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "3.2rem",
  },
  fontWeight: 700, // Ensures bold headline
  lineHeight: 1.2, // Improves spacing
}));


export const SubHeadingFont = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem", // Default (xs)
  fontWeight: 500, // Medium weight for better visibility
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.8rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "2rem",
  },
}));


export const SubHeadingSmall = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem", // Slightly smaller than 1.2rem
  fontWeight: 500, 
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.4rem", // Reduced from 1.5rem
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.7rem", // Reduced from 1.8rem
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.9rem", // Reduced from 2rem
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "1.9rem", // Reduced from 2.2rem
  },
}));


export const ParagraphFont = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem", // Default for xs

  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "1.2rem",
  },
}));

export const ParagraphFont1 = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem", // Reduced from 0.75rem

  [theme.breakpoints.up("md")]: {
    fontSize: "1rem", // Reduced from 1rem
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1rem", // Reduced from 1.2rem
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "1rem", // Reduced from 1.5rem
  },
}));

export const ParagraphFont2 = styled(Typography)(({ theme }) => ({
  fontSize: "0.65rem", 

  [theme.breakpoints.up("md")]: {
    fontSize: "0.85rem", 
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "0.9rem", 
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "1rem", 
  },
}));



// projects cards
export const ProjectContainer = styled(Box)(({ theme }) => ({
  width: '80%',
  margin: '0 auto',  
  position: 'sticky',
  top: 0,
}));


export const ProjectContent = styled(Grid)(({ theme }) => ({

  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  
  [theme.breakpoints.up('xl')]: {
    minHeight: '100vh',
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: '100vh',
  },
  [theme.breakpoints.up('md')]: {
    minHeight: '100vh',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '50vh',
  },
  [theme.breakpoints.down('xs')]: {
    minHeight: '50vh',
  }, 
}));

export const ProjectContent1 = styled(Grid)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  
  minHeight: '100vh', // Default for large screens

  [theme.breakpoints.up('xl')]: {
    minHeight: '100vh',
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: '100vh',
  },
  [theme.breakpoints.up('md')]: {
    minHeight: '100vh',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '50vh',
  },
  [theme.breakpoints.down('xs')]: {
    minHeight: '50vh',
  },
}));


{/* <Box component={'div'}  sx={{ width: '80%', mx: 'auto', position:'sticky', top:0}}> */}

export const CardContainer = styled(Box)(({ theme }) => ({
  width: "350px",
  height: "350px",
  color:'#fff',
  borderRadius: "30px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),

  // Responsive styles
  [theme.breakpoints.down("xl")]: { width: "300px", height: "300px" },
  [theme.breakpoints.down("lg")]: { width: "250px", height: "250px" },
  [theme.breakpoints.down("md")]: { width: "200px", height: "200px" },
  [theme.breakpoints.down("sm")]: { width: "200px", height: "200px" },
}));