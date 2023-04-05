import AttestationDetail from "./views/Attestations/AttestationDetail";
import CreateRewardVoucher from "./views/Rewards/CreateRewardVoucher";
import RewardVoucherDetail from "./views/Rewards/RewardVoucherDetail";

const inner_routes = [
  {
    path: '/attestations/:attestationId',
    name: 'ExplorationCreate',
    icon: '',
    component: AttestationDetail,
    layout: '/holoni',
  },
  {
    path: '/rewards/rewardvouchers/new',
    name: 'RewardVoucherCreate',
    icon: '',
    component: CreateRewardVoucher,
    layout: '/holoni',
  },
  {
    path: '/rewards/rewardvouchers/:rewardVoucherId',
    name: 'RewardVoucherDetail',
    icon: '',
    component: RewardVoucherDetail,
    layout: '/holoni',
  }
];
export default inner_routes;
