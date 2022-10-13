import { getAddress, solidityKeccak256 } from "ethers/lib/utils";
import { keccak256 } from "js-sha3";
import MerkleTree from "merkletreejs";

export type NodePair = {
  address: string;
  amount: number;
};

export type WL_MINT_TYPE = "OG" | "GAME_KEY" | "WL";

export function checksumAddress(address: string) {
  try {
    return getAddress(address.toLowerCase());
  } catch {}

  return address;
}

export function computeHash(address: string, amount: number) {
  return Buffer.from(
    solidityKeccak256(
      ["address", "uint256"],
      [checksumAddress(address), amount]
    ).slice(2),
    "hex"
  );
}

export function generateMerkleTree(data: NodePair[], record?: boolean) {
  const nodes = data.map((v) => computeHash(v.address, v.amount));

  if (record) {
    console.log("nodes", nodes);
  }

  const tree = new MerkleTree(nodes, keccak256, { sortPairs: true });

  return tree;
}

export function getMerkleProof(
  tree: MerkleTree,
  address: string,
  amount: number
) {
  const proof = tree.getHexProof(computeHash(address, amount));

  return proof;
}

export function jsonToArray(json: Record<string, unknown>): NodePair[] {
  const list: NodePair[] = [];
  for (const [key, value] of Object.entries(json)) {
    list.push({
      address: key,
      amount: Number(value),
    });
  }

  return list;
}
