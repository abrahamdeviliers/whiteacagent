import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import InputField from "./InputField";
import DropdownField from "./DropdownField";

export default function PreOrderForm({
  planData,
  leadData,
  dropdowns, // { streams, specialities, states, hospitalTypes }
  // onSubmit,
  onPracticeChange,
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    emailStr: "",
    gst: "",
    billingEntityName: "",
    alternateContactName: "",
    alternateContactNumber: "",
    typeOfHospitalClinic: "",
    practiceId: "",
    specialityId: "",
    state: "",
    city: "",
    street: "",
    zipCode: "",
    country: "India",
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const [errors, setErrors] = useState({});

  /* ---------------- PREFILL ---------------- */
  useEffect(() => {
    if (!planData && !leadData) return;

    setForm((prev) => ({
      ...prev,
      firstName: planData?.firstName || leadData?.firstName || "",
      lastName: planData?.lastName || leadData?.lastName || "",
      mobileNo: planData?.mobileNo || leadData?.mobileNo || "",
      emailStr: planData?.emailStr || leadData?.emailStr || "",
      gst: planData?.gst || "",
      billingEntityName: planData?.billingEntityName || "",
      alternateContactName: planData?.alternateContactName || "",
      alternateContactNumber: planData?.alternateContactNumber || "",
      typeOfHospitalClinic: planData?.typeOfHospitalClinic || "",
      practiceId: planData?.practiceId || "",
      specialityId: planData?.specialityId || "",
      state: planData?.state || "",
      city: planData?.city || "",
      street: planData?.street || "",
      zipCode: planData?.zipCode || "",
      country: planData?.country || "India",
    }));
  }, [planData, leadData]);

  /* ---------------- UPDATE ---------------- */
  const updateForm = useCallback(
    (key, value) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: false }));

      if (key === "practiceId" && value) {
        onPracticeChange?.(value);
      }
    },
    [onPracticeChange]
  );

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    const e = {};

    if (!form.firstName) e.firstName = true;
    if (!form.lastName) e.lastName = true;
    if (!form.mobileNo || form.mobileNo.length !== 10) e.mobileNo = true;
    if (!form.emailStr || !/\S+@\S+\.\S+/.test(form.emailStr)) e.emailStr = true;
    if (!form.billingEntityName) e.billingEntityName = true;
    if (!form.typeOfHospitalClinic) e.typeOfHospitalClinic = true;
    if (!form.practiceId) e.practiceId = true;
    if (!form.specialityId) e.specialityId = true;
    if (!form.state) e.state = true;
    if (!form.city) e.city = true;
    if (!form.street) e.street = true;
    if (!form.zipCode || form.zipCode.length !== 6) e.zipCode = true;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  // const handleSubmit = () => {
  //   if (!validateForm()) return;
  //   onSubmit(form);
  // };

  /* ---------------- UI ---------------- */
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* TITLE */}
      <Text style={styles.title}>Pre-Order Information</Text>

      {/* BASIC DETAILS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Details</Text>
        <InputField
          label="First Name *"
          value={form.firstName}
          error={errors.firstName}
          onChangeText={(v) => updateForm("firstName", v)}
        />
        <InputField
          label="Last Name *"
          value={form.lastName}
          error={errors.lastName}
          onChangeText={(v) => updateForm("lastName", v)}
        />
        <InputField
          label="Mobile Number *"
          value={form.mobileNo}
          keyboardType="numeric"
          maxLength={10}
          error={errors.mobileNo}
          onChangeText={(v) => updateForm("mobileNo", v)}
        />
        <InputField
          label="Email *"
          value={form.emailStr}
          keyboardType="email-address"
          error={errors.emailStr}
          onChangeText={(v) => updateForm("emailStr", v)}
        />
        <InputField
          label="GST"
          value={form.gst}
          onChangeText={(v) => updateForm("gst", v)}
        />
        <InputField
          label="Alternate Contact Name"
          value={form.alternateContactName}
          onChangeText={(v) => updateForm("alternateContactName", v)}
        />
        <InputField
          label="Alternate Contact Number"
          value={form.alternateContactNumber}
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(v) => updateForm("alternateContactNumber", v)}
        />
      </View>

      {/* PRACTICE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Practice Information</Text>
        <InputField
          label="Billing Entity Name *"
          value={form.billingEntityName}
          error={errors.billingEntityName}
          onChangeText={(v) => updateForm("billingEntityName", v)}
        />
        <DropdownField
          label="Type of Hospital / Clinic *"
          value={form.typeOfHospitalClinic}
          options={dropdowns.hospitalTypes}
          error={errors.typeOfHospitalClinic}
          openDropdown={openDropdown === "hospitalType"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "hospitalType" ? null : "hospitalType")
          }
          onSelect={(value) => updateForm("typeOfHospitalClinic", value)}
        />
        <DropdownField
          label="Stream of Practice *"
          value={form.practiceId}
          options={dropdowns.streams}
          error={errors.practiceId}
          openDropdown={openDropdown === "practice"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "practice" ? null : "practice")
          }
          onSelect={(value) => updateForm("practiceId", value)}
        />
        <DropdownField
          label="Speciality *"
          value={form.specialityId}
          options={dropdowns.specialities}
          error={errors.specialityId}
          openDropdown={openDropdown === "speciality"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "speciality" ? null : "speciality")
          }
          onSelect={(value) => updateForm("specialityId", value)}
          disabled={!form.practiceId}
        />
      </View>

      {/* ADDRESS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        <DropdownField
          label="State *"
          value={form.state}
          options={dropdowns.states} // Already in { value, label } format
          error={errors.state}
          openDropdown={openDropdown === "state"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "state" ? null : "state")
          }
          onSelect={(value) => updateForm("state", value)}
        />
        <InputField
          label="City *"
          value={form.city}
          error={errors.city}
          onChangeText={(v) => updateForm("city", v)}
        />
        <InputField
          label="Street Address *"
          value={form.street}
          error={errors.street}
          onChangeText={(v) => updateForm("street", v)}
        />
        <InputField
          label="ZIP Code *"
          value={form.zipCode}
          keyboardType="numeric"
          maxLength={6}
          error={errors.zipCode}
          onChangeText={(v) => updateForm("zipCode", v)}
        />
      </View>

      {/* SUBMIT */}
      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>Submit Pre-Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    marginVertical: 24,
  },
  section: {
    marginBottom: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 14,
  },
  submitBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
