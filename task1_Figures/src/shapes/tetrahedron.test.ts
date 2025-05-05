import {Tetrahedron, TetrahedronFactory} from "./tetrahedron";

test('given valid data, when create is called, rectangle is created', () => {
  const factory = new TetrahedronFactory();
  const data = [1,1,1, -1,-1,1, -1,1,-1, 1,-1,-1];

  const tetrahedron = factory.create('tetra1', data);
  expect(tetrahedron).toBeInstanceOf(Tetrahedron);
  expect(tetrahedron.p1.x).toBe(1);
  expect(tetrahedron.p3.y).toBe(1);
  expect(tetrahedron.p2.z).toBe(1);
  expect(Math.ceil(tetrahedron.calculateVolume())).toBe(3);
});
