const mongoose = require('mongoose');

const InspectionSchema = new mongoose.Schema(
    {
        factory: { type: mongoose.Schema.Types.ObjectId, ref: 'factory', required: true, trim: true },
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, trim: true },
        status: { type: Number, default: 0 }, // 0 - Assigned | 1 - Inspected | 2 - Completed | 3 - SOS
        attendance: {
            entrylocation: { type: { type: String }, coordinates: [String] },
            exitlocation: { type: { type: String }, coordinates: [String] },
        },
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
            { title: String, description: String, createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } },
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
    },
);

module.exports = mongoose.model('inspection', InspectionSchema);
