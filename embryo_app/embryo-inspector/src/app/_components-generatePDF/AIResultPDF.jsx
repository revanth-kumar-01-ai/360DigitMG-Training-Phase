"use client";

import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { styles } from "./PDFStyle";
import getEmbryoQuality from "../../../utils/content";
import {
  generateFocusAreasDescription,
  getConfidenceScoreDescription,
  getDevelopmentStage,
  getKeyIndicatorsDescription,
} from "../../../utils/Insights";

export default function AIResultPDF({ details, message, name, date }) {
  const focusArea = generateFocusAreasDescription([details?.prediction]);
  const developmentStage = getDevelopmentStage(details?.prediction);
  const confidenceScore = getConfidenceScoreDescription(details?.probability);
  const KeyIndicators = getKeyIndicatorsDescription(details?.prediction);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Patient Details */}
        <View style={styles.patientDetails}>
          <Text style={{ marginBottom: 5 }}>Name: {details?.patient_name}</Text>
          <Text style={{ marginBottom: 5 }}>Age: {details?.patient_age}</Text>
          <Text style={{ marginBottom: 5 }}>
            Blood Group: {details?.patient_blood_group}
          </Text>
        </View>

        {/* Embryo Analysis Result Title */}
        <View style={styles.title}>
          <Text>Embryo Analysis Result</Text>
        </View>

        {/* Embryo Analysis Grid */}
        <View style={styles.grid}>
          {/* First Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Grad</Text>
            <Text style={styles.cardContent}>{details?.prediction}</Text>
            <Text style={styles.cardContent}>
              {getEmbryoQuality(details?.prediction || "")}
            </Text>
          </View>

          {/* Second Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Success Rate</Text>
            <Text style={styles.cardContent}>
              {details?.probability?.slice(0, 5)}%
            </Text>
            <Text style={styles.cardContent}>Based on historical data</Text>
          </View>
        </View>

        {/* Visual Analysis Title */}
        <View style={styles.visualAnalysisTitle}>
          <Text>Visual Analysis</Text>
        </View>

        {/* Grid for Images */}
        <View style={styles.grid}>
          {/* First Card - Original Image Embryo */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Original Image Embryo</Text>
            <Image style={styles.image} src={details?.image_path} />
          </View>

          {/* Second Card - Explainable AI */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Explainable AI</Text>
            <Image style={styles.image} src={details?.XAImage} />
          </View>
        </View>

        {/* AI Analysis Insights Title */}
        <View style={styles.aiAnalysisTitle}>
          <Text>AI Analysis Insights</Text>
        </View>

        {/* AI Analysis Grid */}
        <View style={styles.aiGrid}>
          {/* First Card - Focus Areas */}
          <View style={styles.aiCard}>
            <Text style={styles.cardTitle}>Focus Areas</Text>
            <Text style={styles.cardContent}>{focusArea || ""}</Text>
          </View>

          {/* Second Card - Confidence Score */}
          <View style={styles.aiCard}>
            <Text style={styles.cardTitle}>Confidence Score</Text>
            <Text style={styles.cardContent}>{confidenceScore || ""}</Text>
          </View>
        </View>

        <View style={styles.aiGrid}>
          {/* Third Card - Development Stage */}
          <View style={styles.aiCard}>
            <Text style={styles.cardTitle}>Development Stage</Text>
            <Text style={styles.cardContent}>{developmentStage || ""}</Text>
          </View>

          {/* Fourth Card - Key Indicators */}
          <View style={styles.aiCard}>
            <Text style={styles.cardTitle}>Key Indicators</Text>
            <Text style={styles.cardContent}>{KeyIndicators || ""}</Text>
          </View>
        </View>

        <View style={styles.Description}>
          <Text>Doctor Description</Text>
        </View>
        {/* Doctor's Description */}
        <View style={styles.doctorDescription}>
          <Text>{message || ""}</Text>
        </View>

        <View style={styles.dateText}>
          <Text style={{ marginBottom: 5 }}>Doctor: {name || ""}</Text>
          <Text>Date: {date || ""}</Text>
        </View>
      </Page>
    </Document>
  );
}
