"use client";

import { StyleSheet } from "@react-pdf/renderer";

export let styles = StyleSheet.create({
  page: {
    backgroundColor: "tomato",
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: "white",
    textAlign: "left",
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  card: {
    width: "48%", // Each card takes up about half of the page width
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 12,
    color: "#555",
    paddingTop: 3, // Adjusted padding top
    paddingBottom: 3, // Adjusted padding bottom
  },
  visualAnalysisTitle: {
    color: "white",
    textAlign: "left",
    marginTop: 20,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: "100%", // Make sure the image takes full width in the card
    height: 120, // Adjust height to fit your layout
    objectFit: "cover",
    borderRadius: 8,
  },
  aiAnalysisTitle: {
    color: "white",
    textAlign: "left",
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  aiGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  aiCard: {
    width: "48%", // Each card takes up about half of the page width
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  doctorDescription: {
    marginTop: 20,
    fontSize: 12,
    color: "#fff",
    padding: 5,
    textAlign: "left",
  },
  dateText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "left",
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  patientDetails: {
    marginTop: 15,
    fontSize: 12,
    color: "#fff",
    padding: 5,
    textAlign: "left",
    borderBottom: "1px solid #ccc",
    marginBottom: 15, // Add a subtle line below patient details
  },
  Description: {
    color: "white",
    textAlign: "left",
    marginTop: 10,
    marginBottom: -10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
