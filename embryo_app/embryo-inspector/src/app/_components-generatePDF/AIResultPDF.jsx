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
  // Safe fallback values 🛡️
  const prediction = typeof details?.prediction === "string" ? details.prediction : "";
  const probability = typeof details?.probability === "string" ? details.probability : "";

  const focusArea = generateFocusAreasDescription(prediction ? [prediction] : [""]);
  const developmentStage = getDevelopmentStage(prediction);
  const confidenceScore = getConfidenceScoreDescription(probability);
  const KeyIndicators = getKeyIndicatorsDescription(prediction);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Patient Details */}
        <View style={styles.patientDetails}>
          <Text style={{ marginBottom: 5 }}>Name: {details?.patient_name || "N/A"}</Text>
          <Text style={{ marginBottom: 5 }}>Age: {details?.patient_age || "N/A"}</Text>
          <Text style={{ marginBottom: 5 }}>
            Blood Group: {details?.patient_blood_group || "N/A"}
          </Text>
        </View>

        {/* Title */}
        <View style={styles.title}>
          <Text>Embryo Analysis Result</Text>
        </View>

        {/* Result Grid */}
        <View style={styles.grid}>
          {/* Grad Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Grad</Text>
            <Text style={styles.cardContent}>{prediction}</Text>
            <Text style={styles.cardContent}>
              {getEmbryoQuality(prediction)}
            </Text>
          </View>

          {/* Success Rate */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Success Rate</Text>
            <Text style={styles.cardContent}>
              {probability.slice(0, 5)}%
            </Text>
            <Text style={styles.cardContent}>Based on historical data</Text>
          </View>
        </View>

        {/* Visual Analysis Title */}
        <View style={styles.visualAnalysisTitle}>
          <Text>Visual Analysis</Text>
        </View>

        {/* Images Grid */}
        <View style={styles.grid}>
          {/* Original Image */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Original Image Embryo</Text>
            {details?.image_path ? (
              <Image style={styles.image} src={details.image_path} />
            ) : (
              <Text>No image</Text>
            )}
          </View>

          {/* Explainable AI Image */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Explainable AI</Text>
            {details?.XAImage ? (
              <Image style={styles.image} src={details.XAImage} />
            ) : (
              <Text>No XA image</Text>
            )}
          </View>
        </View>

        {/* AI Insights Title */}
        <View style={styles.aiAnalysisTitle}>
          <Text>AI Analysis Insights</Text>
        </View>

        {/* Insights Grid 1 */}
        <View style={styles.aiGrid}>
          <View style={styles.aiCard}>
            <Text style={styles.cardTitle}>Focus Areas</Text>
            <Text style={styles.cardContent}>{focusArea}</Text>
          </View>

          <View style={styles.aiCard}>
            <Text style={styles.cardTitle}>Confidence Score</Text>
            <Text style={styles.cardContent}>{confidenceScore}</Text>
          </View>
        </View>

        {/* Insights Grid 2 */}
        <View style={styles.aiGrid}>
          <View style={styles.aiCard}>
            <Text style={styles.cardTitle}>Development Stage</Text>
            <Text style={styles.cardContent}>{developmentStage}</Text>
          </View>

          <View style={styles.aiCard}>
            <Text style={styles.cardTitle}>Key Indicators</Text>
            <Text style={styles.cardContent}>{KeyIndicators}</Text>
          </View>
        </View>

        {/* Doctor's Description */}
        <View style={styles.Description}>
          <Text>Doctor Description</Text>
        </View>
        <View style={styles.doctorDescription}>
          <Text>{message || "No message provided."}</Text>
        </View>

        {/* Footer */}
        <View style={styles.dateText}>
          <Text style={{ marginBottom: 5 }}>Doctor: {name || "N/A"}</Text>
          <Text>Date: {date || "N/A"}</Text>
        </View>
      </Page>
    </Document>
  );
}
