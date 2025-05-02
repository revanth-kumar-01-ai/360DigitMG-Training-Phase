import ScienceIcon from "@mui/icons-material/Science";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

// hero page
export let heroPageContent = {
  textOne: (
    <>
      Embryo Quality Prediction <br /> System
    </>
  ),
  textTwo: "AI-Powered Analysis for Precise Embryo Assessment",
  textThree:(
    <>
        Leverage advanced artificial intelligence to accurately assess embryo quality. Our system provides real-time analysis, helping medical professionals make informed decisions with greater confidence and precision.
    </>
  )
};

// accuracy details 
export let homeAccuracyCardsDetails = [
  {
    modelName: 'efficientvit_b2.r288_in1k',
    ranking: 'Champion',
    imageSize: 288,
    TrainingAcc: 99.26,
    TestAcc: 95.72,
    Date: 'Last Updated: April 2025'
  },
  {
    modelName: 'ConvNeXtBase',
    ranking: 'Challenger',
    imageSize: 224,
    TrainingAcc: 99.43,
    TestAcc: 94.35,
    Date: 'Last Updated: April 2025'
  },
  {
    modelName: 'swinv2_base_window12_192_22k',
    ranking: 'Contender',
    imageSize: 192,
    TrainingAcc: 97.9,
    TestAcc: 93.11,
    Date: 'Last Updated: April 2025'
  },
  {
    modelName: 'EfficientNetB7',
    ranking: 'Leader',
    imageSize: 224,
    TrainingAcc: 97.97,
    TestAcc: 92.4,
    Date: 'Last Updated: April 2025'
  },
  {
    modelName: 'ResNet152',
    ranking: 'Top Dog ',
    imageSize: 224,
    TrainingAcc: 98.21,
    TestAcc: 89.26,
    Date: 'Last Updated: April 2025'
  },
  {
    modelName: 'DenseNet201',
    ranking: 'Veteran ',
    imageSize: 224,
    TrainingAcc: 93.29,
    TestAcc: 77.42,
    Date: 'Last Updated: April 2025'
  }
];



// home page EmbryoInsightsHub
export let EmbryoInsightsHubDetails = [
  {
      icon:(<ScienceIcon sx={{fontSize:"50px"}} color='primary' />),
      title:'AI-Powered Analysis',
      content: (
        <>
         Advanced machine learning algorithms provide accurate and <br /> consistent embryo quality assessment
        </>
      ),
  },
  {
      icon:(<SpeedRoundedIcon sx={{fontSize:"50px"}} color='primary' />),
      title:'Real-time Results',
      content: (
        <>
           AGet instant analysis results to support time <br /> sensitive decision making 
        </>
      ),   
  },
  {
      icon:(<TaskAltIcon sx={{fontSize:"50px"}} color='primary' />),
      title:'Expert Validation',
      content: (
        <>
          All results are validated by experienced embryologists and  <br /> medical professionals
        </>
      ),    
  },
]


export let score = [
  {
     score:'95.72%', 
     name:'Success Rate'
  },
  {
     score:'10,000+', 
     name:'Image Datasets'
  },
  {
     score:'10', 
     name:'Classes'
  },
  {
     score:'6+', 
     name:'Research Papers'
  },
]


export default function getEmbryoQuality(className) {
  if (
    className === "Blastocyst Grade A" ||
    className === "8-cell Grade A" ||
    className === "Morula Grade A"
  ) {
    return "High-quality";
  } else if (
    className === "Blastocyst Grade B" ||
    className === "8-cell Grade B" ||
    className === "Morula Grade B"
  ) {
    return "Moderate-quality";
  } else if (
    className === "Blastocyst Grade C" ||
    className === "8-cell Grade C" ||
    className === "Morula Grade C"
  ) {
    return "Low-quality ❌";
  } else if (className === "Error Images") {
    return "Invalid image";
  } else {
    return "Unknown class";
  }
}
