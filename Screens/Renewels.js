import { View, ScrollView, Modal, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import DateRangePicker from "../Components/DateRangePicker";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import ExpandableCard from "../Components/ExpandableCard";
import InterestFlow from "../Components/Calls/IntrestFlow";
import { Ionicons } from "@expo/vector-icons";

function Renewels() {
  const [mobile, setMobile] = useState("");
  const [renewals, setRenewels] = useState([]);
  const [showInterest, setShowInterest] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [planData, setPlanData] = useState(null);

  const { sessionToken, user } = useContext(AuthContext);

  // Fetch renewal listing
  async function getData() {
    try {
      const res = await axios.post(
        "https://svcdev.whitecoats.com/agent/getRenewalListing",
        { mobileNo: mobile, agentId: user.agentId },
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );
      setRenewels(res.data.renewalListing || []);
    } catch (err) {
      console.log("Error fetching renewals", err);
    }
  }

  // Fetch plan data for selected item
  async function fetchPlanData(item) {
    try {
      const res = await axios.post(
        "https://svcdev.whitecoats.com/agent/planListing",
        {
          leadId: item.leadId,
          doctorId: item.doctorId,
          agentId: user.agentId,
          showAllPlans: false,
        },
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );

      setPlanData(res.data);
      setSelectedItem(item);
      setShowInterest(true);
    } catch (err) {
      console.log("PLAN API ERROR:", err);
    }
  }

  return (
    <>
      <DateRangePicker
        showMobile={true}
        onMobileChange={(val) => setMobile(val)}
        onSubmit={getData}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {renewals.map((item, index) => (
          <ExpandableCard
            key={index}
            header={item.name}
            subHeader={item.specialityName}
            badgeText={item.planName}
            amount={`#${item.subscriptionId}`}
            showInterest={true}
            onInterestPress={() => fetchPlanData(item)} // open modal like AgentCancelled
            rows={[
              { label: "DoctorId", value: item.doctorId },
              { label: "Mobile", value: item.mobile },
              { label: "Start Date", value: item.startDate },
              { label: "End Date", value: item.endDate },
              { label: "PlanId", value: item.planId },
              { label: "planPricingId", value: item.planPricingId },
              { label: "practiceId", value: item.practiceId },
              { label: "specialityId", value: item.specialityId },
              { label: "specialityName", value: item.specialityName },
              { label: "subscriptionId", value: item.subscriptionId },
              { label: "subscriptionOrderId", value: item.subscriptionOrderId },
            ]}
          />
        ))}
      </ScrollView>

      {/* INTEREST FLOW MODAL */}
      <Modal
        visible={showInterest}
        transparent
        animationType="slide"
        onRequestClose={() => setShowInterest(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close button */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowInterest(false)}
            >
              <Ionicons name="close" size={22} color="#0F172A" />
            </TouchableOpacity>

            {/* Scrollable content */}
            <ScrollView
              contentContainerStyle={{ paddingTop: 40, paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {selectedItem && (
                <InterestFlow
                  leadData={selectedItem}
                  planData={planData}
                  sessionToken={sessionToken}
                  onClose={() => setShowInterest(false)}
                />
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end", // bottom sheet style
  },

  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 16,
    maxHeight: "90%", // scroll-safe
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 12,
  },

  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    padding: 6,
  },
});

export default Renewels;
