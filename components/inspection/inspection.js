const mongoose = require("mongoose");

const InspectionSchema = new mongoose.Schema(
  {
    factory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "factory",
      required: true,
      trim: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      trim: true,
    },
    inspectionDate: { type: Date },
    inspectionReportUploadDate: { type: Date },
    status: { type: Number, default: 0 }, // 0 - Assigned | 1 - Inspected | 2 - Completed | 3 - SOS
    attendance: {
      entrylocation: { type: { type: String }, coordinates: [String] },
      exitlocation: { type: { type: String }, coordinates: [String] },
    },
    teamNames: { type: String, trim: true }, // Memeber of inspection Team
    finalRecommendation: { type: String, trim: true }, // Final Recommendation
    complianceStatus: { type: Boolean }, // Compliance status as per discharge norms
    tempcloseStatus: { type: Boolean }, // Close status
    showcausenoticeStatus: { type: Boolean }, // condition of non compliance
    wasteWaterGeneration: { type: String, trim: true }, // Waste water generation
    wasteWaterDischarge: { type: String, trim: true }, // Waste water discharge
    bod: { type: String, trim: true }, // BOD
    bodLoad: { type: String, trim: true }, // BOD Load
    cod: { type: String, trim: true }, // COD
    codLoad: { type: String, trim: true }, // COD Load
    otherChars: { type: String, trim: true }, // Other characterestics
    nonInstallationofOCEMS: { type: Boolean, default: false }, // Non-installation and non-connectivity of OCEMS
    temperedOCEMS: { type: Boolean, default: false }, // OCEMS found disconnected/partial OCEMS/tampered.
    dissentBypassArrangement: { type: Boolean, default: false }, // More than consented outlet(s) and/or any bypass arrangement
    provision: { type: Boolean, default: false }, // Provision for flow diversion through flexible pipelines in the ETP
    defunctETP: { type: Boolean, default: false }, // Defunct/ non-operational ETP which could not be made operational during inspection
    ZLDnorms: { type: Boolean, default: false }, // Non-compliance of ZLD norms (in case of ZLD units)
    standardExceedance: { type: Boolean, default: false }, // Exceedance of the notified effluent discharge standards
    dilutionInETP: { type: Boolean, default: false }, // Dilution or addition of fresh water at any stage of treatment in ETP.
    dissentWaterDischarge: { type: Boolean, default: false }, // Waste water discharge beyond consented quantity.
    unauthorizedDisposal: { type: Boolean, default: false }, // Unauthorized disposal of Hazardous waste or inadequate Hazardous Waste storage capacity
    effluent: { type: Boolean, default: false }, // Injection of treated or untreated effluent or both into ground water (reverse boring).
    invalidCTO: { type: Boolean, default: false }, // Invalid CTO, HW authorization (wherever applicable) & not applied for fresh/renewal.
    fieldReport: {
      images: [String],
      poc: [
        // contacted person
        {
          name: { type: String, lowercase: true, trim: true },
          number: { type: String, lowercase: true, trim: true },
          email: { type: String, lowercase: true, trim: true },
        },
      ],
      uos: {
        // Unit operational status
        type: String, // 0 - Non operational | 1 - Operational | 2 - other
      },
      uosdetail: {
        // unit operational status 2  then add information
        type: String,
      },
      nous: {
        // Non operational unit status
        type: String, // 0 - Temporary closed | 1 - Self closed | 2 - others
      },
      nousdetail: {
        // non operation type 2 then add information
        type: String,
      },
      etpos: {
        // ETP operational status
        type: String, // 0 - Non operational | 1 - Operational | 2 - other
      },
      etposdetail: { type: String },
      cpc: {
        // consented production capacity
        type: String,
      },
      ipc: {
        // installed production capacity
        type: String,
      },
      ppopd: {
        //present production of previous day
        type: String,
      },
      fwwpdbofm: {
        //fresh water withdrawal previous day based on flow meter
        type: String,
      },
      ocs: {
        // online connectivity status
        type: String, // 0 - Not Connected | 1 - Connected
      },
      sonfc: {
        // Status of noc from cgwa
        type: String, // 0 - Not Valid | 1 - Valid
      },
      mrr: {
        // Mode to reach river
        type: String, // 0 - Drain | 1 - Tributary | 2 - Directly to river ganga
      },
      mrrname: {
        // drain or tributary name
        type: String,
      },
      csac: {
        // consent status air consent
        type: String, // 0 - Invalid | 1 - Valid | 2 - Applied | 3 - Not Provided
      },
      wc: {
        // water consent
        type: String, // 0 - Invalid | 1 - Valid | 2 - Applied | 3 - Not Provided
      },
      hc: {
        // Hazardouc consent
        type: String, // 0 - Invalid | 1 - Valid | 2 - Applied | 3 - Not Provided
      },
      cc: {
        // CGWA consent
        type: String, // 0 - Invalid | 1 - Valid | 2 - Applied | 3 - Not Provided
      },
      sfwc: {
        // Source of fresh water consumption
        type: String, // 0 - Borewell | 1 - Tubewell | 2 - River | 3 - Other
      },
      sfwcdetail: {
        // fresh water source 3 then explain or give reason
        type: String,
      },
      fib: {
        // Flowmeter installed at Borewell
        type: String, // 0 - Installed & working | 1 - Installed & not working | 2 - Not Installed | 3 - Other
      },
      fibdetail: {
        // Flowmeter installed at Borewell detail
        type: String,
      },
      fietpinlet: {
        // Flowmeter installed at Etp inlet
        type: String, // 0 - Installed & working | 1 - Installed & not working | 2 - Not Installed | 3 - Other
      },
      fietpinletdetail: {
        // Flowmeter installed at Etp inlet detail
        type: String,
      },
      fietpoutlent: {
        // Flowmeter installed at Etp outlent
        type: String, // 0 - Installed & working | 1 - Installed & not working | 2 - Not Installed | 3 - Other
      },
      fietpoutlentdetail: {
        // Flowmeter installed at Etp outlent detail
        type: String,
      },
      fmetpoutletcdf: {
        // Flow meter at etp outlet current day flow (KLD)
        type: String,
      },
      fmetpoutletpdf: {
        // Flow meter at etp outlet Previous day flow (KLD)
        type: String,
      },
      os: {
        // ocems status
        type: String, // 0 - Installed & working | 1 - Installed & not working | 2 - Not Installed | 3 - Other
      },
      osdetail: {
        // ocems status detail
        type: String,
      },
      semfetp: {
        // Separate energy for etp
        type: String,
      },
      semfer: {
        // Separate energy for etp reading
        type: String,
      },
      specificobservations: {
        // Specific Observations
        type: String,
      },
    },
    report: {
      files: [String],
      images: [String],
    },
    actions: [
      {
        complianceStatus: { type: Number, default: 1 }, // Compliance status as per spcb > non-compliance - 0, compliance - 1, temporary closed - 2, permanently closed - 3
        showcausenoticeStatus: { type: Boolean }, // condition of non-compliance
        date: { type: Date }, // action date
        finalRecommendation: { type: String, trim: true }, // final recommendation for action
        reports: [{ type: String, trim: true }], // action reports
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    sos: {
      type: String,
    },
    sosdetails: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("inspection", InspectionSchema);
