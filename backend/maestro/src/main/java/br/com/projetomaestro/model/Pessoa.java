package br.com.projetomaestro.model;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tb_pessoa")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Pessoa {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long codigo;
	
	@Column(nullable = false)
	private String nome;
	
	private Date dataNascimentno;
	
	@Column(nullable = false)
	@Pattern(regexp = "[MF]",message = "O sexo deve ser M (masculino) ou F (feminino)")
	private String sexo;
	
	private String cpf;
	
	private String rg;
	
	private String email;
	
	private String celular;
	
	private String endereco;
	
	private Integer num_endereco;
	
	private String complemento;
	
	private String bairro;
	
	private String cidade;
	
	private String uf;
	
	private Integer cep;
	
}
