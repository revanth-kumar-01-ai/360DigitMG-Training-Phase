export function generateFocusAreasDescription(focusAreas) {
    let description = `Focus Areas for Comprehensive Analysis:\n`;

    focusAreas.forEach(area => {
        if (area.includes('Grade A')) {
            description += `Embryos have high quality, suitable for implantation. \n`;
        } else if (area.includes('Grade B')) {
            description += `Embryos show moderate quality, can be implanted with care. \n`;
        } else if (area.includes('Grade C')) {
            description += `Embryos have lower quality and need further evaluation. \n`;
        } else if (area === 'Error Images') {
            description += `Images are unclear or corrupted, making classification impossible. \n`;
        } else {
            description += `Embryos need monitoring to assess viability for development. \n`;
        }
    });

    return description;
}


export function getDevelopmentStage(className) {
    const stages = {
        "8-cell Grade A": "Optimal cell structure, evenly divided cells, no fragmentation, a strong sign of normal development.",
        "8-cell Grade B": "Slightly uneven cells, some minor fragmentation, still viable for further development.",
        "8-cell Grade C": "Uneven cells with noticeable fragmentation, development might be delayed or impaired.",
        "Blastocyst Grade A": "Blastocyst with optimal expansion, even cell distribution, and proper inner cell mass development.",
        "Blastocyst Grade B": "Slightly expanded blastocyst, cell distribution may show mild abnormalities, but still viable.",
        "Blastocyst Grade C": "Poorly expanded blastocyst with uneven cell distribution, viability may be compromised.",
        "Error Images": "Images that don't meet the expected criteria for analysis, may include distortions or misidentifications.",
        "Morula Grade A": "Compact cell mass with uniform division, early-stage embryo showing proper division and development.",
        "Morula Grade B": "Morula with slight unevenness in cell division or minor irregularities, still early-stage but developing.",
        "Morula Grade C": "Morula with considerable irregularities in cell division, signs of delayed or abnormal development."
      };
    
      if (stages[className]) {
        return stages[className];
      } else {
        return "Class not found.";
      }
}



export function getConfidenceScoreDescription(probString) {
    // If the input is an error image, handle it separately
    if (probString.toLowerCase() === "error image") {
      return 'Error Image - Unable to assess confidence due to image issue or corruption.';
    }
  
    // Parse the string to a floating-point number
    const prob = parseFloat(probString);
  
    // Check if the parsed number is a valid number and within the valid range
    if (isNaN(prob) || prob < 1 || prob > 100) {
      return 'Invalid probability score. Please provide a score between 1 and 100.';
    }
  
    // Use the same logic to return the description based on the parsed number
    if (prob >= 90 && prob <= 100) {
      return `Very High confidence (probability: ${prob.toFixed(2)}%) - Strong support, highly reliable assessment.`;
    } else if (prob >= 75 && prob < 90) {
      return `High confidence (probability: ${prob.toFixed(2)}%) - Clear and consistent features, strong basis for assessment.`;
    } else if (prob >= 50 && prob < 75) {
      return `Medium confidence (probability: ${prob.toFixed(2)}%) - Some ambiguity, plausible but uncertain.`;
    } else if (prob >= 25 && prob < 50) {
      return `Low confidence (probability: ${prob.toFixed(2)}%) - Unclear features, unreliable or uncertain assessment.`;
    } else if (prob > 0 && prob < 25) {
      return `Very Low confidence (probability: ${prob.toFixed(2)}%) - Very uncertain, assessment may be inaccurate.`;
    }
  }
  


export function getKeyIndicatorsDescription(className) {
    switch (className) {
      case '8-cell Grade A':
        return 'Cells are uniform, compact, with intact membranes and clear boundaries.';
      case '8-cell Grade B':
        return 'Slight variation in cell size with mostly intact membranes and shape.';
      case '8-cell Grade C':
        return 'Irregular cell size and partial fragmentation observed in the structure.';
      case 'Morula Grade A':
        return 'Dense compaction with uniform cell mass and strong intercellular contact.';
      case 'Morula Grade B':
        return 'Moderate compaction and some unevenness in cell packing seen.';
      case 'Morula Grade C':
        return 'Loose compaction with irregular cell borders and slight disorganization.';
      case 'Blastocyst Grade A':
        return 'Expanded blastocoel, strong trophectoderm and ICM clearly visible.';
      case 'Blastocyst Grade B':
        return 'Moderate expansion and fairly distinct ICM and trophectoderm layers.';
      case 'Blastocyst Grade C':
        return 'Poor expansion, weak ICM visibility and irregular outer cell layer.';
      case 'Error Images':
        return 'Image corrupted or unclear, key indicators cannot be reliably assessed.';
      default:
        return 'Unknown class. Please provide a valid embryo development stage.';
    }
  }